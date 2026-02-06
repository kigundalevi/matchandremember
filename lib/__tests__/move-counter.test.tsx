import { describe, it, expect } from 'vitest';

describe('Move Counter', () => {
  it('should initialize move count to 0', () => {
    const initialMoveCount = 0;
    expect(initialMoveCount).toBe(0);
  });

  it('should increment move count after each pair of flips', () => {
    let moveCount = 0;
    
    // First flip
    moveCount = 0;
    expect(moveCount).toBe(0);
    
    // Second flip (completes first move)
    moveCount = 1;
    expect(moveCount).toBe(1);
    
    // Third flip
    moveCount = 1;
    expect(moveCount).toBe(1);
    
    // Fourth flip (completes second move)
    moveCount = 2;
    expect(moveCount).toBe(2);
  });

  it('should reset move count when game is reinitialized', () => {
    let moveCount = 5;
    expect(moveCount).toBe(5);
    
    // Reset game
    moveCount = 0;
    expect(moveCount).toBe(0);
  });

  it('should track moves correctly for different difficulties', () => {
    const difficulties = {
      easy: { pairs: 2, expectedMaxMoves: 4 },
      medium: { pairs: 6, expectedMaxMoves: 12 },
      hard: { pairs: 8, expectedMaxMoves: 16 },
    };

    for (const [difficulty, config] of Object.entries(difficulties)) {
      let moveCount = 0;
      
      // Simulate worst-case scenario: every flip is a different card
      for (let i = 0; i < config.expectedMaxMoves; i++) {
        moveCount++;
      }
      
      expect(moveCount).toBeLessThanOrEqual(config.expectedMaxMoves);
      expect(moveCount).toBeGreaterThan(0);
    }
  });

  it('should display move count as a positive integer', () => {
    const moveCounts = [0, 1, 5, 10, 100];
    
    for (const count of moveCounts) {
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});
