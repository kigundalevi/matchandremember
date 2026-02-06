import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useGame } from '@/lib/game-context';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { soundEnabled, toggleSound } = useGame();

  const handlePlayPress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/category');
  };

  const handleSoundToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleSound();
  };

  return (
    <ScreenContainer className="p-6">
      <View className="flex-1 items-center justify-center">
        {/* Sound Toggle - Top Right */}
        <View className="absolute top-4 right-4">
          <TouchableOpacity
            onPress={handleSoundToggle}
            className="w-12 h-12 items-center justify-center rounded-full bg-surface"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
          >
            <Text className="text-2xl">{soundEnabled ? '🔊' : '🔇'}</Text>
          </TouchableOpacity>
        </View>

        {/* App Logo */}
        <View className="items-center mb-12">
          <Text className="text-5xl mb-4">🎴</Text>
          <Text className="text-4xl font-bold text-foreground text-center">
            Match & Remember
          </Text>
          <Text className="text-lg text-muted text-center mt-2">
            Find the matching pairs!
          </Text>
        </View>

        {/* Play Button */}
        <TouchableOpacity
          onPress={handlePlayPress}
          className="bg-primary px-16 py-6 rounded-3xl"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
          }}
        >
          <Text className="text-white text-2xl font-bold">Play</Text>
        </TouchableOpacity>

        {/* Decorative Elements */}
        <View className="absolute bottom-8 flex-row gap-4">
          <Text className="text-3xl opacity-30">⭐</Text>
          <Text className="text-3xl opacity-30">☁️</Text>
          <Text className="text-3xl opacity-30">⭐</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
