import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemTypeEnum, ItemType } from '../form-item.model';
import { ItemOptionFormGroup } from './item-option-form-group.model';
import { createExtrasFor, ItemExtrasFormGroup } from './item-extras-form-group.model';

export type ItemFormGroup = FormGroup<{
  question: FormControl<string>;
  type: FormControl<ItemType>;
  required: FormControl<boolean>;
  options: FormArray<ItemOptionFormGroup>;
  extras: ItemExtrasFormGroup;
  kind: FormControl<ElementKindEnum>;
}>;

export type SeparatorFormGroup = FormGroup<{
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  kind: FormControl<ElementKindEnum>;
}>;

export enum ElementKindEnum {
  ITEM = 'item',
  SEPARATOR = 'separator',
}

export type ElementFormGroup = ItemFormGroup | SeparatorFormGroup;

export function createFormItem(): ItemFormGroup {
  const defaultType: ItemType = ItemTypeEnum.text;
  return new FormGroup({
    question: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<ItemType>(defaultType, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    required: new FormControl(false, { nonNullable: true }),
    options: new FormArray<ItemOptionFormGroup>([]),
    extras: createExtrasFor(defaultType),
    kind: new FormControl<ElementKindEnum>(ElementKindEnum.ITEM, { nonNullable: true }),
  });
}

export function createFormSeparator(): SeparatorFormGroup {
  return new FormGroup({
    title: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    kind: new FormControl<ElementKindEnum>(ElementKindEnum.SEPARATOR, { nonNullable: true }),
  });
}
