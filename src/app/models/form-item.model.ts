import { Validator } from './validator.model';

export enum ItemTypeEnum {
  text = 'text',
  number = 'number',
  // select = 'select',
  // checkbox = 'checkbox',
  // date = 'date',
  // radio = 'radio',
}

export type ItemType = keyof typeof ItemTypeEnum;

export interface FormItem {
  id: string;
  formGroupId: string;
  type: ItemType;
  question: string;
  options?: FormItemOption[]; // For 'select' or 'checkbox' types
  placeholder?: string;
  order: number;
  validators?: Validator[];
}

export interface FormItemOption {
  value: string;
  label: string;
}
