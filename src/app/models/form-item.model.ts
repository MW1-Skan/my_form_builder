import { ItemExtras } from './item-extras.model';
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
  type: ItemType;
  question: string;
  required: boolean;
  options?: FormItemOption[]; // For 'select' or 'checkbox' types
  extras: ItemExtras;
}

export interface FormItemOption {
  value: string;
  label: string;
}
