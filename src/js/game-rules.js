
/**
 * This file contains the core constants and rules for the game.
 * Centralizing them here makes the game easier to configure and understand.
 */

// The number of points awarded for the first correct "Heaven" problem in a streak.
export const POINTS_FIRST_CORRECT = 3;

// The number of additional points awarded for each subsequent correct "Heaven" problem in a streak.
// E.g., 1st correct = 3, 2nd = 4 (3+1), 3rd = 5 (3+2), etc.
export const POINTS_PER_STREAK = 1;

// The maximum number of questions available for both Earth and Heaven.
export const MAX_QUESTIONS = 25;

// The key used to save and load game state from the browser's localStorage.
export const LOCAL_STORAGE_KEY = 'heavenAndEarthGameState';
