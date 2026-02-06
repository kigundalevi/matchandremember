import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { audioManager } from './audio-manager';

export type Category = 'animals' | 'shapes' | 'numbers';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type Card = {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type BestScores = {
  easy: number | null;
  medium: number | null;
  hard: number | null;
};

type GameContextType = {
  category: Category | null;
  difficulty: Difficulty | null;
  soundEnabled: boolean;
  cards: Card[];
  selectedCards: string[];
  matchedPairs: number;
  moveCount: number;
  bestScores: BestScores;
  setCategory: (category: Category) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  toggleSound: () => void;
  initializeGame: () => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  saveBestScore: (difficulty: Difficulty, moves: number) => Promise<void>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CATEGORY: '@match_remember_category',
  DIFFICULTY: '@match_remember_difficulty',
  SOUND: '@match_remember_sound',
  BEST_SCORES: '@match_remember_best_scores',
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [bestScores, setBestScores] = useState<BestScores>({
    easy: null,
    medium: null,
    hard: null,
  });

  // Load preferences from AsyncStorage
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const [savedCategory, savedDifficulty, savedSound, savedScores] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CATEGORY),
        AsyncStorage.getItem(STORAGE_KEYS.DIFFICULTY),
        AsyncStorage.getItem(STORAGE_KEYS.SOUND),
        AsyncStorage.getItem(STORAGE_KEYS.BEST_SCORES),
      ]);

      if (savedCategory) setCategory(savedCategory as Category);
      if (savedDifficulty) setDifficulty(savedDifficulty as Difficulty);
      if (savedSound !== null) {
        const soundEnabled = savedSound === 'true';
        setSoundEnabled(soundEnabled);
        audioManager.setSoundEnabled(soundEnabled);
      }
      if (savedScores) {
        const scores = JSON.parse(savedScores) as BestScores;
        setBestScores(scores);
      }
      await audioManager.initialize();
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const handleSetCategory = async (newCategory: Category) => {
    setCategory(newCategory);
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORY, newCategory);
  };

  const handleSetDifficulty = async (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    await AsyncStorage.setItem(STORAGE_KEYS.DIFFICULTY, newDifficulty);
  };

  const handleToggleSound = async () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    audioManager.setSoundEnabled(newValue);
    await AsyncStorage.setItem(STORAGE_KEYS.SOUND, String(newValue));
  };

  const getDifficultyConfig = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return { pairs: 2, rows: 2, cols: 2 }; // 2x2 = 4 cards
      case 'medium':
        return { pairs: 6, rows: 3, cols: 4 }; // 3x4 = 12 cards
      case 'hard':
        return { pairs: 8, rows: 4, cols: 4 }; // 4x4 = 16 cards
    }
  };

  const getCategoryAssets = (cat: Category, count: number): string[] => {
    // Return asset identifiers based on category
    const assets: Record<Category, string[]> = {
      animals: ['bear', 'cat', 'dog', 'elephant', 'fox', 'giraffe', 'lion', 'monkey', 'panda', 'rabbit', 'tiger', 'zebra', 'koala', 'penguin', 'owl', 'frog'],
      shapes: ['circle-red', 'square-blue', 'triangle-green', 'star-yellow', 'heart-pink', 'diamond-purple', 'hexagon-orange', 'oval-teal', 'rectangle-lime', 'pentagon-coral', 'octagon-cyan', 'cross-magenta', 'moon-indigo', 'cloud-amber', 'sun-rose', 'flower-mint'],
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    };

    return assets[cat].slice(0, count);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    if (!category || !difficulty) return;

    const config = getDifficultyConfig(difficulty);
    const assets = getCategoryAssets(category, config.pairs);

    // Create pairs
    const cardPairs = assets.flatMap((asset, index) => [
      { id: `${asset}-1-${index}`, value: asset, isFlipped: false, isMatched: false },
      { id: `${asset}-2-${index}`, value: asset, isFlipped: false, isMatched: false },
    ]);

    // Shuffle
    const shuffledCards = shuffleArray(cardPairs);

    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedPairs(0);
    setMoveCount(0);
  };

  const flipCard = (cardId: string) => {
    // Don't allow flipping if 2 cards already selected
    if (selectedCards.length >= 2) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped) return;

    // Play flip sound
    if (soundEnabled) {
      audioManager.playSound('flip');
    }

    // Flip the card
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    // Increment move count (count each pair of flips as one move)
    if (newSelected.length === 2) {
      setMoveCount((prev) => prev + 1);
    }

    // Check for match if 2 cards are selected
    if (newSelected.length === 2) {
      const [firstId, secondId] = newSelected;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match!
        if (soundEnabled) {
          audioManager.playSound('match');
        }
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setSelectedCards([]);
        }, 300);
      } else {
        // No match - flip back after delay
        if (soundEnabled) {
          audioManager.playSound('mismatch');
        }
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            )
          );
          setSelectedCards([]);
        }, 700);
      }
    }
  };

  const saveBestScore = async (diff: Difficulty, moves: number) => {
    try {
      const currentBest = bestScores[diff];
      if (currentBest === null || moves < currentBest) {
        const updatedScores = { ...bestScores, [diff]: moves };
        setBestScores(updatedScores);
        await AsyncStorage.setItem(STORAGE_KEYS.BEST_SCORES, JSON.stringify(updatedScores));
      }
    } catch (error) {
      console.error('Error saving best score:', error);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <GameContext.Provider
      value={{
        category,
        difficulty,
        soundEnabled,
        cards,
        selectedCards,
        matchedPairs,
        moveCount,
        bestScores,
        setCategory: handleSetCategory,
        setDifficulty: handleSetDifficulty,
        toggleSound: handleToggleSound,
        initializeGame,
        flipCard,
        resetGame,
        saveBestScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
