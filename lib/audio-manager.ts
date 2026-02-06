import { setAudioModeAsync } from 'expo-audio';
import { Platform } from 'react-native';

// Sound effect URLs - using free, child-friendly sound effects from Mixkit
const SOUND_URLS = {
  flip: 'https://assets.mixkit.co/active_storage/sfx/1438/1438-preview.mp3',
  match: 'https://assets.mixkit.co/active_storage/sfx/1438/1438-preview.mp3',
  mismatch: 'https://assets.mixkit.co/active_storage/sfx/1436/1436-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1438/1438-preview.mp3',
};

type SoundType = keyof typeof SOUND_URLS;

class AudioManager {
  private isInitialized = false;
  private soundEnabled = true;

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Configure audio mode for iOS to play in silent mode
      if (Platform.OS !== 'web') {
        await setAudioModeAsync({
          playsInSilentMode: true,
        });
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  async playSound(soundType: SoundType) {
    if (!this.soundEnabled) return;

    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const soundUrl = SOUND_URLS[soundType];
      if (soundUrl && Platform.OS === 'web') {
        // For web, use HTML5 audio
        try {
          const audio = new Audio(soundUrl);
          audio.volume = 0.7;
          audio.play().catch(err => {
            console.warn(`Error playing ${soundType} sound:`, err);
          });
        } catch (error) {
          console.warn(`Error creating audio element for ${soundType}:`, error);
        }
      }
      // Native audio playback is handled by expo-audio in the game context
    } catch (error) {
      console.warn(`Error in playSound for ${soundType}:`, error);
    }
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  isSoundEnabled() {
    return this.soundEnabled;
  }

  async cleanup() {
    try {
      this.isInitialized = false;
    } catch (error) {
      console.error('Error cleaning up audio:', error);
    }
  }
}

export const audioManager = new AudioManager();
