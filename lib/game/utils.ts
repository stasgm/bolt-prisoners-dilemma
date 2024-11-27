import { Choice } from "./types";

// Badge color constants
export const BADGE_COLORS = {
  WIN: 'bg-green-600',
  LOSE: 'bg-red-600',
  DRAW: 'bg-blue-600',
} as const;

/**
 * Get the badge color based on points comparison or game choice
 * @param value1 First value (points or choice)
 * @param value2 Second value (points or choice)
 * @returns Tailwind CSS class for the badge background color
 */
export const getBadgeColor = (value1: number | Choice, value2: number | Choice): string => {
  // Handle points comparison
  if (typeof value1 === 'number' && typeof value2 === 'number') {
    if (value1 > value2) return BADGE_COLORS.WIN;
    if (value1 < value2) return BADGE_COLORS.LOSE;
    return BADGE_COLORS.DRAW;
  }
  
  // Handle cooperation/betrayal
  if (value1 === 'cooperate') {
    return value2 === 'cooperate' ? BADGE_COLORS.DRAW : BADGE_COLORS.WIN;
  }
  return BADGE_COLORS.LOSE;
};
