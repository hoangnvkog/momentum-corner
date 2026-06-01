'use client';

import { createContext, useContext } from 'react';

export interface ThemeColors {
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDim: string;
  textFaint: string;
  textUltraFaint: string;
  bgCard: string;
  bgCardHover: string;
  bgSection: string;
  borderPrimary: string;
  borderHover: string;
  borderSubtle: string;
  divider: string;
  placeholder: string;
  navBg: string;
  navBorder: string;
  timelineLine: string;
  inputBorder: string;
  inputBorderFocus: string;
  gradientTitleStart: string;
  gradientTitleMid: string;
  gradientTitleEnd: string;
  gradientPhilosophyStart: string;
  gradientPhilosophyEnd: string;
  gradientNightTitleStart: string;
  gradientNightTitleEnd: string;
  accentGreen: string;
  accentCyan: string;
  accentPurple: string;
  overlayBg: string;
  dividerLine: string;
  scrollHintLine: string;
  cardHoverBg: string;
  focusBtnBorder: string;
  focusBtnBg: string;
  focusBtnText: string;
}

export const DARK_COLORS: ThemeColors = {
  textPrimary: 'rgba(255,255,255,0.9)',
  textSecondary: 'rgba(255,255,255,0.6)',
  textMuted: 'rgba(255,255,255,0.4)',
  textDim: 'rgba(255,255,255,0.25)',
  textFaint: 'rgba(255,255,255,0.15)',
  textUltraFaint: 'rgba(255,255,255,0.1)',
  bgCard: 'rgba(255,255,255,0.03)',
  bgCardHover: 'rgba(255,255,255,0.06)',
  bgSection: '#0F1115',
  borderPrimary: 'rgba(255,255,255,0.06)',
  borderHover: 'rgba(255,255,255,0.12)',
  borderSubtle: 'rgba(255,255,255,0.04)',
  divider: 'rgba(255,255,255,0.08)',
  placeholder: 'rgba(255,255,255,0.15)',
  navBg: 'rgba(5,5,5,0.9)',
  navBorder: 'rgba(255,255,255,0.06)',
  timelineLine: 'rgba(255,255,255,0.06)',
  inputBorder: 'rgba(255,255,255,0.06)',
  inputBorderFocus: 'rgba(0,255,198,0.15)',
  gradientTitleStart: 'rgba(255,255,255,0.95)',
  gradientTitleMid: 'rgba(255,255,255,0.6)',
  gradientTitleEnd: 'rgba(0,255,198,0.8)',
  gradientPhilosophyStart: 'rgba(255,255,255,0.8)',
  gradientPhilosophyEnd: 'rgba(255,255,255,0.2)',
  gradientNightTitleStart: 'rgba(255,255,255,0.5)',
  gradientNightTitleEnd: 'rgba(255,255,255,0.15)',
  accentGreen: '#00FFC6',
  accentCyan: '#7FDBFF',
  accentPurple: '#8B5CF6',
  overlayBg: 'rgba(0,0,0,0.4)',
  dividerLine: 'rgba(255,255,255,0.15)',
  scrollHintLine: 'rgba(255,255,255,0.2)',
  cardHoverBg: 'rgba(255,255,255,0.04)',
  focusBtnBorder: 'rgba(255,255,255,0.1)',
  focusBtnBg: 'rgba(255,255,255,0.02)',
  focusBtnText: 'rgba(255,255,255,0.5)',
};

export const LIGHT_COLORS: ThemeColors = {
  textPrimary: 'rgba(0,0,0,0.9)',
  textSecondary: 'rgba(0,0,0,0.6)',
  textMuted: 'rgba(0,0,0,0.45)',
  textDim: 'rgba(0,0,0,0.35)',
  textFaint: 'rgba(0,0,0,0.2)',
  textUltraFaint: 'rgba(0,0,0,0.1)',
  bgCard: 'rgba(0,0,0,0.02)',
  bgCardHover: 'rgba(0,0,0,0.04)',
  bgSection: '#F0F0F0',
  borderPrimary: 'rgba(0,0,0,0.10)',
  borderHover: 'rgba(0,0,0,0.20)',
  borderSubtle: 'rgba(0,0,0,0.06)',
  divider: 'rgba(0,0,0,0.12)',
  placeholder: 'rgba(0,0,0,0.25)',
  navBg: 'rgba(250,250,250,0.92)',
  navBorder: 'rgba(0,0,0,0.08)',
  timelineLine: 'rgba(0,0,0,0.08)',
  inputBorder: 'rgba(0,0,0,0.10)',
  inputBorderFocus: 'rgba(0,184,148,0.3)',
  gradientTitleStart: 'rgba(0,0,0,0.9)',
  gradientTitleMid: 'rgba(0,0,0,0.6)',
  gradientTitleEnd: 'rgba(0,184,148,0.8)',
  gradientPhilosophyStart: 'rgba(0,0,0,0.8)',
  gradientPhilosophyEnd: 'rgba(0,0,0,0.3)',
  gradientNightTitleStart: 'rgba(0,0,0,0.6)',
  gradientNightTitleEnd: 'rgba(0,0,0,0.2)',
  accentGreen: '#00B894',
  accentCyan: '#5DADE2',
  accentPurple: '#6C3483',
  overlayBg: 'rgba(255,255,255,0.15)',
  dividerLine: 'rgba(0,0,0,0.15)',
  scrollHintLine: 'rgba(0,0,0,0.2)',
  cardHoverBg: 'rgba(0,0,0,0.04)',
  focusBtnBorder: 'rgba(0,0,0,0.1)',
  focusBtnBg: 'rgba(0,0,0,0.02)',
  focusBtnText: 'rgba(0,0,0,0.5)',
};

export const ThemeContext = createContext<ThemeColors>(DARK_COLORS);

export function useTheme() {
  return useContext(ThemeContext);
}
