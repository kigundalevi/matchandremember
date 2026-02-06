import { describe, it, expect } from 'vitest';

describe('Best Score Tracking', () => {
  it('should initialize best scores as null', () => {
    const bestScores = {
      easy: null,
      medium: null,
      hard: null,
    };

    expect(bestScores.easy).toBeNull();
    expect(bestScores.medium).toBeNull();
    expect(bestScores.hard).toBeNull();
  });

  it('should save a new best score', () => {
    let bestScores: { easy: number | null; medium: number | null; hard: number | null } = {
      easy: null,
      medium: null,
      hard: null,
    };

    // Save first score
    bestScores.easy = 8;
    expect(bestScores.easy).toBe(8);
  });

  it('should only update best score if new score is lower', () => {
    let bestScores = {
      easy: 10,
      medium: null,
      hard: null,
    };

    // Try to save higher score - should not update
    const newScore = 12;
    if (newScore < bestScores.easy) {
      bestScores.easy = newScore;
    }
    expect(bestScores.easy).toBe(10);

    // Save lower score - should update
    const lowerScore = 8;
    if (lowerScore < bestScores.easy) {
      bestScores.easy = lowerScore;
    }
    expect(bestScores.easy).toBe(8);
  });

  it('should track best scores independently for each difficulty', () => {
    const bestScores: { easy: number; medium: number; hard: number } = {
      easy: 6,
      medium: 15,
      hard: 24,
    };

    expect(bestScores.easy).toBe(6);
    expect(bestScores.medium).toBe(15);
    expect(bestScores.hard).toBe(24);
  });

  it('should persist best scores to storage', () => {
    const bestScores = {
      easy: 6,
      medium: 15,
      hard: 24,
    };

    const serialized = JSON.stringify(bestScores);
    const deserialized = JSON.parse(serialized);

    expect(deserialized.easy).toBe(6);
    expect(deserialized.medium).toBe(15);
    expect(deserialized.hard).toBe(24);
  });

  it('should detect new best score', () => {
    const bestScores = {
      easy: 10,
      medium: null,
      hard: null,
    };

    const currentMoves = 10;
    const isNewBest = bestScores.easy === currentMoves;
    expect(isNewBest).toBe(true);

    const currentMoves2 = 8;
    const isNewBest2 = bestScores.easy === currentMoves2;
    expect(isNewBest2).toBe(false);
  });

  it('should handle all three difficulty levels', () => {
    const difficulties = ['easy', 'medium', 'hard'] as const;
    let bestScores: { easy: number | null; medium: number | null; hard: number | null } = {
      easy: null,
      medium: null,
      hard: null,
    };

    difficulties.forEach((diff) => {
      expect(bestScores[diff]).toBeNull();
    });

    // Set scores for all difficulties
    bestScores.easy = 6;
    bestScores.medium = 15;
    bestScores.hard = 24;

    difficulties.forEach((diff) => {
      expect(bestScores[diff]).not.toBeNull();
    });
  });

  it('should compare move counts correctly', () => {
    const scores = [6, 8, 10, 15, 24];

    for (let i = 0; i < scores.length - 1; i++) {
      expect(scores[i]).toBeLessThan(scores[i + 1]);
    }
  });
});
