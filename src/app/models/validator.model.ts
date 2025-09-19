type ValidatorType = 'required' | 'minLength' | 'maxLength' | 'pattern' | 'rule';

export interface Validator {
  type: ValidatorType;
  value?: string | number | boolean | RegExp;
  message?: string;
}
