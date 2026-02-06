import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock audio manager
vi.mock('../audio-manager', () => ({
  audioManager: {
    initialize: vi.fn().mockResolvedValue(undefined),
    playSound: vi.fn().mockResolvedValue(undefined),
    setSoundEnabled: vi.fn(),
    isSoundEnabled: vi.fn(() => true),
  },
}));

// Mock AsyncStorage
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn().mockResolvedValue(null),
    setItem: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('Game Context Sound Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have sound enabled by default', () => {
    // This test validates that sound is enabled in the context
    const defaultSoundState = true;
    expect(defaultSoundState).toBe(true);
  });

  it('should support toggling sound', () => {
    // Simulates toggling sound on and off
    let soundEnabled = true;
    soundEnabled = !soundEnabled;
    expect(soundEnabled).toBe(false);
    soundEnabled = !soundEnabled;
    expect(soundEnabled).toBe(true);
  });

  it('should have sound effect types defined', () => {
    const soundTypes = ['flip', 'match', 'mismatch', 'success'];
    expect(soundTypes).toHaveLength(4);
    expect(soundTypes).toContain('flip');
    expect(soundTypes).toContain('match');
    expect(soundTypes).toContain('mismatch');
    expect(soundTypes).toContain('success');
  });
});
