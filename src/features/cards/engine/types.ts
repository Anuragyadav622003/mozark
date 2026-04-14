/**
 * Card Engine Types
 * Every card screen is described by a ScreenConfig.
 * The CardScreen renderer interprets the config — no per-card files needed.
 */

export type TextBlockConfig = {
  type: 'text';
  testID: string;
  content: string;
  rotate?: '90deg' | '180deg' | '-15deg';
  lowContrast?: boolean;
  selectable?: boolean;
  narrow?: boolean;
  wrap?: boolean;
};

export type TapTargetConfig = {
  type: 'tap_target';
  label: string;
  count: number;
  correctIndex: number;
  testIDPrefix: string;
  onCorrect: string; // route name
  wrongMessage: string;
};

export type DelayedRevealConfig = {
  type: 'delayed_reveal';
  items: Array<{
    id: string;
    label: string;
    trigger: 'timer' | 'tap' | 'scroll';
    delayMs?: number;
    testID: string;
    onRevealNavigate?: string;
  }>;
};

export type ValidationListConfig = {
  type: 'validation_list';
  elements: Array<{ id: string; label: string; present: boolean }>;
  testIDPrefix: string;
};

export type InfiniteListConfig = {
  type: 'infinite_list';
  pageSize: number;
  targetId: number;
  onTargetPress: string; // route name
  testIDPrefix: string;
};

export type EditableListConfig = {
  type: 'editable_list';
  initialCount: number;
  onItemPress?: string; // route for first item
  testIDPrefix: string;
};

export type ScaledImagesConfig = {
  type: 'scaled_images';
  label: string;
  scales: number[];
  onPress: string;
  testIDPrefix: string;
};

export type MultiLangConfig = {
  type: 'multi_lang';
  words: Array<{ text: string; lang: string; correct: boolean }>;
  onCorrect: string;
  testIDPrefix: string;
};

export type FlickerConfig = {
  type: 'flicker';
  items: Array<{ id: string; label: string; intervalMs: number; color: string }>;
};

export type RandomLayoutConfig = {
  type: 'random_layout';
  buttons: Array<{ id: string; label: string; color: string }>;
  testIDPrefix: string;
  onPress?: string;
};

export type MisleadingButtonsConfig = {
  type: 'misleading_buttons';
  label: string;
  count: number;
  correctIndex: number;
  testIDPrefix: string;
};

export type LagButtonConfig = {
  type: 'lag_button';
  label: string;
  lagMs: number | 'random';
  testID: string;
  onSuccess?: string;
};

export type SectionConfig = {
  label: string;
  content: ContentConfig;
};

export type ContentConfig =
  | TextBlockConfig
  | TapTargetConfig
  | DelayedRevealConfig
  | ValidationListConfig
  | InfiniteListConfig
  | EditableListConfig
  | ScaledImagesConfig
  | MultiLangConfig
  | FlickerConfig
  | RandomLayoutConfig
  | MisleadingButtonsConfig
  | LagButtonConfig;

export type ScreenConfig = {
  heading: string;
  hint?: string;
  sections: SectionConfig[];
  cta?: {
    label: string;
    testID: string;
    route: string;
    routeParams?: Record<string, unknown>;
  };
};
