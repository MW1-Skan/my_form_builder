export type ItemExtras = TextExtras | NumberExtras;

export type TextExtras = {
  required: boolean;
  placeholder: string;
  isLarge: boolean;
  minLength: number;
  maxLength: number;
  mask: string;
  isEmail: boolean;
};

export type NumberExtras = {
  required: boolean;
  placeholder: string;
  min: number;
  max: number;
  forceLimits: boolean;
  isDecimal: boolean;
  maxFractionDigits: number;
  showStepButtons: boolean;
  step: number;
};
