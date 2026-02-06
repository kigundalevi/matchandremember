import { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Fade in animation
    opacity.value = withTiming(1, { duration: 1500 });

    // Navigate to home after animation
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Animated.View style={animatedStyle}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}
