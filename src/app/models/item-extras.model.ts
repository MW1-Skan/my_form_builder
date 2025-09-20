export type ItemExtras = TextExtras | NumberExtras;

export type TextExtras = {
  placeholder: string;
  isLarge: boolean;
  minLength: number;
  maxLength: number;
  mask: string;
  isEmail: boolean;
};

export type NumberExtras = {
  placeholder: string;
  min: number;
  max: number;
  forceLimits: boolean;
  isDecimal: boolean;
  maxFractionDigits: number;
  showStepButtons: boolean;
  step: number;
};
