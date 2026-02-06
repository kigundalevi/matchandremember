import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useGame } from '@/lib/game-context';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';

export default function CompletionScreen() {
  const router = useRouter();
  const { resetGame, moveCount, difficulty, bestScores, saveBestScore } = useGame();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    // Save best score when game completes
    if (difficulty) {
      saveBestScore(difficulty, moveCount);
    }
  }, []);

  const isBestScore = difficulty && bestScores[difficulty] === moveCount;

  const handlePlayAgain = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Reset game state and navigate directly to game screen
    resetGame();
    router.replace('/game');
  };

  const handleHome = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/(tabs)');
  };

  return (
    <ScreenContainer className="p-6">
      <View className="flex-1 items-center justify-center">
        {/* Celebration Animation */}
        <View className="mb-8">
          <CelebrationStars />
        </View>

        {/* Success Message */}
        <Text className="text-5xl font-bold text-foreground text-center mb-4">
          Great Job!
        </Text>
        <Text className="text-2xl text-muted text-center mb-8">
          You found all the matches! 🎉
        </Text>

        {/* Move Count Display */}
        <View className="bg-surface rounded-2xl px-8 py-4 mb-4 items-center">
          <Text className="text-sm text-muted font-medium mb-2">Total Moves</Text>
          <Text className="text-4xl font-bold text-primary">{moveCount}</Text>
        </View>

        {/* Best Score Badge */}
        {isBestScore && (
          <View className="bg-yellow-100 rounded-full px-6 py-2 mb-12 flex-row items-center gap-2">
            <Text className="text-2xl">🏆</Text>
            <Text className="text-lg font-bold text-yellow-800">New Best Score!</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="gap-4 w-full max-w-xs">
          <TouchableOpacity
            onPress={handlePlayAgain}
            className="bg-primary px-12 py-5 rounded-3xl items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 }}
          >
            <Text className="text-white text-xl font-bold">Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleHome}
            className="bg-surface px-12 py-5 rounded-3xl items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
          >
            <Text className="text-foreground text-xl font-bold">Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

function CelebrationStars() {
  const stars = ['⭐', '✨', '🌟', '💫', '⭐'];

  return (
    <View className="flex-row gap-4">
      {stars.map((star, index) => (
        <AnimatedStar key={index} emoji={star} delay={index * 100} />
      ))}
    </View>
  );
}

function AnimatedStar({ emoji, delay }: { emoji: string; delay: number }) {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withSequence(
        withTiming(1.2, { duration: 300 }),
        withTiming(1, { duration: 200 })
      );
      rotate.value = withRepeat(
        withSequence(
          withTiming(10, { duration: 500 }),
          withTiming(-10, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        true
      );
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={{ fontSize: 48 }}>{emoji}</Text>
    </Animated.View>
  );
}
