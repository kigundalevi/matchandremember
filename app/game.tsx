import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useGame } from '@/lib/game-context';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function GameScreen() {
  const router = useRouter();
  const { cards, difficulty, category, soundEnabled, toggleSound, initializeGame, flipCard, matchedPairs, moveCount } = useGame();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (!category || !difficulty) {
      router.replace('/(tabs)');
      return;
    }
    initializeGame();
    hasNavigatedRef.current = false;
  }, [category, difficulty]);

  // Check for game completion - only navigate once
  useEffect(() => {
    if (cards.length === 0 || hasNavigatedRef.current) return;
    const totalPairs = cards.length / 2;
    if (matchedPairs === totalPairs && matchedPairs > 0) {
      hasNavigatedRef.current = true;
      const timer = setTimeout(() => {
        router.push('/completion');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [matchedPairs, cards.length]);

  const handleCardPress = (cardId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    flipCard(cardId);
  };

  const handleHome = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/(tabs)');
  };

  const handleSoundToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleSound();
  };

  const getGridConfig = () => {
    switch (difficulty) {
      case 'easy':
        return { cols: 2, rows: 2, cardSize: Math.min((width - 80) / 2, 140) };
      case 'medium':
        return { cols: 3, rows: 4, cardSize: Math.min((width - 100) / 3, 100) };
      case 'hard':
        return { cols: 4, rows: 4, cardSize: Math.min((width - 120) / 4, 80) };
      default:
        return { cols: 2, rows: 2, cardSize: 140 };
    }
  };

  const gridConfig = getGridConfig();

  return (
    <ScreenContainer className="p-6">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={handleHome}
          className="w-12 h-12 items-center justify-center rounded-full bg-surface"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
        >
          <Text className="text-2xl">🏠</Text>
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-sm text-muted font-medium">Moves</Text>
          <Text className="text-2xl font-bold text-primary">{moveCount}</Text>
        </View>

        <TouchableOpacity
          onPress={handleSoundToggle}
          className="w-12 h-12 items-center justify-center rounded-full bg-surface"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
        >
          <Text className="text-2xl">{soundEnabled ? '🔊' : '🔇'}</Text>
        </TouchableOpacity>
      </View>

      {/* Game Board */}
      <View className="flex-1 items-center justify-center">
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: gridConfig.cols * (gridConfig.cardSize + 12),
            gap: 12,
          }}
        >
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              size={gridConfig.cardSize}
              onPress={() => handleCardPress(card.id)}
            />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

type GameCardProps = {
  card: { id: string; value: string; isFlipped: boolean; isMatched: boolean };
  size: number;
  onPress: () => void;
};

function GameCard({ card, size, onPress }: GameCardProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (card.isFlipped || card.isMatched) {
      rotation.value = withTiming(180, { duration: 450 });
    } else {
      rotation.value = withTiming(0, { duration: 450 });
    }
  }, [card.isFlipped, card.isMatched]);

  useEffect(() => {
    if (card.isMatched) {
      // Bounce animation on match
      rotation.value = withSequence(
        withTiming(180, { duration: 0 }),
        withTiming(190, { duration: 150 }),
        withTiming(180, { duration: 150 })
      );
    }
  }, [card.isMatched]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
  }));

  const getCardEmoji = (value: string): string => {
    // Animals
    const animalMap: Record<string, string> = {
      bear: '🐻', cat: '🐱', dog: '🐶', elephant: '🐘', fox: '🦊', giraffe: '🦒',
      lion: '🦁', monkey: '🐵', panda: '🐼', rabbit: '🐰', tiger: '🐯', zebra: '🦓',
      koala: '🐨', penguin: '🐧', owl: '🦉', frog: '🐸',
    };

    // Shapes
    const shapeMap: Record<string, string> = {
      'circle-red': '🔴', 'square-blue': '🟦', 'triangle-green': '🔺', 'star-yellow': '⭐',
      'heart-pink': '💗', 'diamond-purple': '💎', 'hexagon-orange': '🔶', 'oval-teal': '🔵',
      'rectangle-lime': '🟩', 'pentagon-coral': '🔸', 'octagon-cyan': '🔷', 'cross-magenta': '❌',
      'moon-indigo': '🌙', 'cloud-amber': '☁️', 'sun-rose': '☀️', 'flower-mint': '🌸',
    };

    // Numbers
    const numberMap: Record<string, string> = {
      '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣',
      '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',
      '10': '🔟', '11': '1️⃣1️⃣', '12': '1️⃣2️⃣', '13': '1️⃣3️⃣', '14': '1️⃣4️⃣', '15': '1️⃣5️⃣',
    };

    return animalMap[value] || shapeMap[value] || numberMap[value] || '❓';
  };

  const isVisible = card.isFlipped || card.isMatched;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={card.isMatched || card.isFlipped}
      style={{ width: size, height: size }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            width: size,
            height: size,
            backgroundColor: isVisible ? '#6EB5A7' : '#E6ECEF',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          },
        ]}
      >
        {isVisible ? (
          <Text style={{ fontSize: size * 0.5 }}>{getCardEmoji(card.value)}</Text>
        ) : (
          <Text style={{ fontSize: size * 0.4 }}>🎴</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}
