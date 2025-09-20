import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemTypeEnum, ItemType, FormItem } from '../form-item.model';
import { ItemOptionFormGroup } from './item-option-form-group.model';
import { createExtrasFormFor, ItemExtrasFormGroup } from './item-extras-form-group.model';
import { FormCluster } from '../form.model';

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

export function createFormItem(item?: FormItem): ItemFormGroup {
  const defaultType: ItemType = ItemTypeEnum.text;
  return new FormGroup({
    question: new FormControl(item?.question ?? '', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<ItemType>(item?.type ?? defaultType, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    required: new FormControl(item?.required ?? false, { nonNullable: true }),
    options: new FormArray<ItemOptionFormGroup>([]),
    extras: createExtrasFormFor(item?.type ?? defaultType, item?.extras),
    kind: new FormControl<ElementKindEnum>(ElementKindEnum.ITEM, { nonNullable: true }),
  });
}

export function createFormSeparator(cluster?: FormCluster): SeparatorFormGroup {
  return new FormGroup({
    title: new FormControl<string | null>(cluster?.title ?? null),
    description: new FormControl<string | null>(cluster?.description ?? null),
    kind: new FormControl<ElementKindEnum>(ElementKindEnum.SEPARATOR, { nonNullable: true }),
  });
}
