/**
 * This file contains the core constants and rules for the game.
 */

export const POINTS_FIRST_CORRECT = 3;
export const POINTS_PER_STREAK = 1;
export const MAX_QUESTIONS = 25;
export const LOCAL_STORAGE_KEY = 'heavenAndEarthGameState';

export interface Team {
    name: string;
    score: number;
    streak: number;
    location: 'Earth' | 'Heaven';
    usedEarthQuestions: number[];
    usedHeavenQuestions: number[];
}
