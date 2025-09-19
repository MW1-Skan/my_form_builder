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
}>;

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
  });
}
