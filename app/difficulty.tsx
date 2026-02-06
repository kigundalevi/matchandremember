import { View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useGame, type Difficulty } from '@/lib/game-context';
import * as Haptics from 'expo-haptics';

type DifficultyOption = {
  id: Difficulty;
  title: string;
  cardCount: string;
  gridSize: string;
  icon: string;
  buttonColor: string;
  bgColor: string;
  gridEmojis: string[];
};

const difficulties: DifficultyOption[] = [
  {
    id: 'easy',
    title: 'Easy',
    cardCount: '4 Cards (2×2)',
    gridSize: '2x2',
    icon: '😊',
    buttonColor: '#5ECCC0',
    bgColor: 'bg-[#E8F5F2]',
    gridEmojis: ['⭕', '⭕', '⭕', '⭕'],
  },
  {
    id: 'medium',
    title: 'Medium',
    cardCount: '12 Cards (3×4)',
    gridSize: '3x4',
    icon: '😄',
    buttonColor: '#F4C563',
    bgColor: 'bg-[#FEF8ED]',
    gridEmojis: ['🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨'],
  },
  {
    id: 'hard',
    title: 'Hard',
    cardCount: '16 Cards (4×4)',
    gridSize: '4x4',
    icon: '🚀',
    buttonColor: '#F4A583',
    bgColor: 'bg-[#FEF0EB]',
    gridEmojis: ['🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧', '🟧'],
  },
];

export default function DifficultyScreen() {
  const router = useRouter();
  const { setDifficulty, bestScores } = useGame();

  const handleDifficultySelect = (difficultyId: Difficulty) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setDifficulty(difficultyId);
    router.push('/game');
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            onPress={handleBack}
            className="w-12 h-12 items-center justify-center rounded-full bg-surface mr-4"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
          >
            <Text className="text-2xl text-primary">‹</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-foreground">Choose Level</Text>
        </View>

        {/* Subtitle */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-foreground mb-2">Ready to Play?</Text>
          <Text className="text-lg text-muted">Pick a size to start matching!</Text>
        </View>

        {/* Difficulty Cards */}
        <View className="gap-6 pb-8">
          {difficulties.map((difficulty) => (
            <DifficultyCard
              key={difficulty.id}
              difficulty={difficulty}
              bestScore={bestScores[difficulty.id]}
              onSelect={() => handleDifficultySelect(difficulty.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

type DifficultyCardProps = {
  difficulty: DifficultyOption;
  bestScore: number | null;
  onSelect: () => void;
};

function DifficultyCard({ difficulty, bestScore, onSelect }: DifficultyCardProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.9}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className={`${difficulty.bgColor} rounded-3xl p-6 flex-row items-center justify-between`}>
        {/* Left Section */}
        <View className="flex-1">
          {/* Title with Icon */}
          <View className="flex-row items-center mb-2">
            <Text className="text-3xl mr-3">{difficulty.icon}</Text>
            <Text className="text-3xl font-bold text-foreground">{difficulty.title}</Text>
          </View>

          {/* Card Count */}
          <Text className="text-lg text-muted mb-2 ml-12">{difficulty.cardCount}</Text>

          {/* Best Score */}
          {bestScore !== null && (
            <Text className="text-sm text-primary font-semibold mb-6 ml-12">🏆 Best: {bestScore} moves</Text>
          )}

          {/* Start Button */}
          <TouchableOpacity
            onPress={onSelect}
            style={{
              backgroundColor: difficulty.buttonColor,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}
            className="rounded-full px-8 py-3 flex-row items-center justify-center w-40"
          >
            <Text className="text-white text-lg font-bold mr-2">Start</Text>
            <Text className="text-white text-lg">▶</Text>
          </TouchableOpacity>
        </View>

        {/* Right Section - Grid Visualization */}
        <View className="ml-6 items-center justify-center">
          <GridVisualization difficulty={difficulty} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

type GridVisualizationProps = {
  difficulty: DifficultyOption;
};

function GridVisualization({ difficulty }: GridVisualizationProps) {
  const getGridLayout = (id: Difficulty) => {
    switch (id) {
      case 'easy':
        return { cols: 2, rows: 2 };
      case 'medium':
        return { cols: 3, rows: 4 };
      case 'hard':
        return { cols: 4, rows: 4 };
    }
  };

  const layout = getGridLayout(difficulty.id);
  const itemSize = difficulty.id === 'easy' ? 24 : difficulty.id === 'medium' ? 18 : 14;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: layout.cols * (itemSize + 6),
        gap: 6,
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
      }}
    >
      {difficulty.gridEmojis.map((emoji, index) => (
        <View
          key={index}
          style={{
            width: itemSize,
            height: itemSize,
            borderRadius: itemSize / 2,
            backgroundColor: difficulty.buttonColor,
            opacity: 0.7,
          }}
        />
      ))}
    </View>
  );
}
