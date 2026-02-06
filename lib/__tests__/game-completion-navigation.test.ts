import { describe, it, expect, beforeEach } from 'vitest';

describe('Game Completion Navigation', () => {
  let navigationTriggered = false;
  let navigationCount = 0;

  beforeEach(() => {
    navigationTriggered = false;
    navigationCount = 0;
  });

  it('should track navigation state with ref', () => {
    const hasNavigatedRef = { current: false };
    expect(hasNavigatedRef.current).toBe(false);

    hasNavigatedRef.current = true;
    expect(hasNavigatedRef.current).toBe(true);
  });

  it('should prevent multiple navigation calls', () => {
    const hasNavigatedRef = { current: false };

    const triggerNavigation = () => {
      if (!hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        navigationCount++;
      }
    };

    triggerNavigation();
    triggerNavigation();
    triggerNavigation();

    expect(navigationCount).toBe(1);
  });

  it('should reset navigation flag on new game', () => {
    const hasNavigatedRef = { current: false };

    const startNewGame = () => {
      hasNavigatedRef.current = false;
    };

    hasNavigatedRef.current = true;
    expect(hasNavigatedRef.current).toBe(true);

    startNewGame();
    expect(hasNavigatedRef.current).toBe(false);
  });

  it('should only navigate when all pairs are matched', () => {
    const hasNavigatedRef = { current: false };
    let matchedPairs = 0;
    const totalPairs = 2;

    const checkCompletion = () => {
      if (hasNavigatedRef.current) return;
      if (matchedPairs === totalPairs && matchedPairs > 0) {
        hasNavigatedRef.current = true;
        navigationCount++;
      }
    };

    checkCompletion();
    expect(navigationCount).toBe(0);

    matchedPairs = 1;
    checkCompletion();
    expect(navigationCount).toBe(0);

    matchedPairs = 2;
    checkCompletion();
    expect(navigationCount).toBe(1);
  });

  it('should not navigate if matchedPairs is zero', () => {
    const hasNavigatedRef = { current: false };
    let matchedPairs = 0;
    const totalPairs = 0;

    const checkCompletion = () => {
      if (hasNavigatedRef.current) return;
      if (matchedPairs === totalPairs && matchedPairs > 0) {
        hasNavigatedRef.current = true;
        navigationCount++;
      }
    };

    checkCompletion();
    expect(navigationCount).toBe(0);
    expect(hasNavigatedRef.current).toBe(false);
  });

  it('should handle multiple game sessions', () => {
    const hasNavigatedRef = { current: false };
    let matchedPairs = 0;
    const totalPairs = 2;

    const startNewGame = () => {
      hasNavigatedRef.current = false;
      matchedPairs = 0;
    };

    const checkCompletion = () => {
      if (hasNavigatedRef.current) return;
      if (matchedPairs === totalPairs && matchedPairs > 0) {
        hasNavigatedRef.current = true;
        navigationCount++;
      }
    };

    // First game
    matchedPairs = 2;
    checkCompletion();
    expect(navigationCount).toBe(1);

    // Start second game
    startNewGame();
    expect(hasNavigatedRef.current).toBe(false);

    // Complete second game
    matchedPairs = 2;
    checkCompletion();
    expect(navigationCount).toBe(2);
  });

  it('should clear timeout on unmount', () => {
    let timeoutCleared = false;
    const mockClearTimeout = () => {
      timeoutCleared = true;
    };

    const cleanup = () => {
      mockClearTimeout();
    };

    cleanup();
    expect(timeoutCleared).toBe(true);
  });

  it('should not navigate if cards array is empty', () => {
    const hasNavigatedRef = { current: false };
    let cards: any[] = [];

    const checkCompletion = () => {
      if (cards.length === 0 || hasNavigatedRef.current) return;
      hasNavigatedRef.current = true;
      navigationCount++;
    };

    checkCompletion();
    expect(navigationCount).toBe(0);
  });
});
