export type ItemExtras = TextExtras | NumberExtras | DateExtras;

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

export type DateExtras = {
  required: boolean;
  placeholder: string;
  minDate: Date;
  maxDate: Date;
  showIcon: boolean;
  isRange: boolean;
  canType: boolean;
  showTime: boolean;
};
