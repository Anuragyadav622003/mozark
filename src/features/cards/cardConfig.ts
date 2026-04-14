/**
 * cardConfig — single source of truth for all 15 home screen cards.
 * HomeScreen renders from this config — no hardcoded card data in UI.
 */
import type { RootStackParamList } from '../../navigation/types';

export type CardEntryRoute = Extract<keyof RootStackParamList, `Card${number}_S1`>;

export type CardConfig = {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  color: string;
  screen: CardEntryRoute;
};

export const CARD_CONFIG: CardConfig[] = [
  { id: 'c1',  num: 1,  title: 'OCR / Text Chaos',         subtitle: 'Rotated, overlapping, duplicate text',      color: '#667eea', screen: 'Card1_S1'  },
  { id: 'c2',  num: 2,  title: 'Image vs OCR',              subtitle: 'Text / image / blurred detection',          color: '#764ba2', screen: 'Card2_S1'  },
  { id: 'c3',  num: 3,  title: 'Partial Scroll',            subtitle: 'Bounded scroll inside static layout',       color: '#f093fb', screen: 'Card3_S1'  },
  { id: 'c4',  num: 4,  title: 'Infinite Scroll',           subtitle: 'Lazy load + target detection',              color: '#f5576c', screen: 'Card4_S1'  },
  { id: 'c5',  num: 5,  title: 'Animation Interference',    subtitle: 'Moving target among animated decoys',       color: '#4facfe', screen: 'Card5_S1'  },
  { id: 'c6',  num: 6,  title: 'Hidden / Delayed',          subtitle: 'Delay, scroll, tap-triggered reveals',      color: '#00f2fe', screen: 'Card6_S1'  },
  { id: 'c7',  num: 7,  title: 'Multi-Element Validation',  subtitle: 'ANY / ALL logic with missing elements',     color: '#43e97b', screen: 'Card7_S1'  },
  { id: 'c8',  num: 8,  title: 'Resizable Box',             subtitle: 'Drag handle to resize, content scales',    color: '#38f9d7', screen: 'Card8_S1'  },
  { id: 'c9',  num: 9,  title: 'Nested Gesture Conflict',   subtitle: 'Horizontal inside vertical scroll',         color: '#fa709a', screen: 'Card9_S1'  },
  { id: 'c10', num: 10, title: 'Randomized Layout',         subtitle: 'Elements reorder on every render',          color: '#fee140', screen: 'Card10_S1' },
  { id: 'c11', num: 11, title: 'Flicker / Unstable UI',     subtitle: 'Rapid appear/disappear cycles',             color: '#f77062', screen: 'Card11_S1' },
  { id: 'c12', num: 12, title: 'Multi-Language OCR',        subtitle: 'English, Hindi, symbols, mixed scripts',    color: '#a18cd1', screen: 'Card12_S1' },
  { id: 'c13', num: 13, title: 'Resolution / Scaling',      subtitle: 'Different sizes, pixel density issues',     color: '#fbc2eb', screen: 'Card13_S1' },
  { id: 'c14', num: 14, title: 'Misleading UI',             subtitle: 'Fake buttons — find the real one',          color: '#ff9a9e', screen: 'Card14_S1' },
  { id: 'c15', num: 15, title: 'Lag / Performance',         subtitle: 'Delayed render, slow response, lag spikes', color: '#a1c4fd', screen: 'Card15_S1' },
];
