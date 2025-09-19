// item-form-group.model.ts
import { FormControl, FormGroup } from '@angular/forms';
import { ItemType, ItemTypeEnum } from '../form-item.model';

export type ItemExtrasFormGroup =
  | TextExtrasFormGroup
  | NumberExtrasFormGroup
  | EmptyExtrasFormGroup;

export type TextExtrasFormGroup = FormGroup<{
  placeholder: FormControl<string | null>;
  isLarge: FormControl<boolean>;
  minLength: FormControl<number | null>;
  maxLength: FormControl<number | null>;
  mask: FormControl<string | null>;
  isEmail: FormControl<boolean>;
}>;

export type NumberExtrasFormGroup = FormGroup<{
  placeholder: FormControl<string | null>;
  min: FormControl<number | null>;
  max: FormControl<number | null>;
  forceLimits: FormControl<boolean>;
  isDecimal: FormControl<boolean>;
  maxFractionDigits: FormControl<number | null>;
  showStepButtons: FormControl<boolean>;
  step: FormControl<number | null>;
}>;

export type EmptyExtrasFormGroup = FormGroup<{}>;

export function createTextExtras(): TextExtrasFormGroup {
  return new FormGroup({
    placeholder: new FormControl<string | null>(null),
    isLarge: new FormControl(false, { nonNullable: true }),
    minLength: new FormControl<number | null>(null),
    maxLength: new FormControl<number | null>(null),
    mask: new FormControl<string | null>(null),
    isEmail: new FormControl(false, { nonNullable: true }),
  });
}

export function createNumberExtras(): NumberExtrasFormGroup {
  return new FormGroup({
    placeholder: new FormControl<string | null>(null),
    min: new FormControl<number | null>(null),
    max: new FormControl<number | null>(null),
    forceLimits: new FormControl(false, { nonNullable: true }),
    isDecimal: new FormControl(false, { nonNullable: true }),
    maxFractionDigits: new FormControl<number | null>(null),
    showStepButtons: new FormControl(false, { nonNullable: true }),
    step: new FormControl<number | null>(null),
  });
}

export function createEmptyExtras(): EmptyExtrasFormGroup {
  return new FormGroup({});
}

export function createExtrasFor(type: ItemType | null): ItemExtrasFormGroup {
  switch (type) {
    case ItemTypeEnum.text:
      return createTextExtras();
    case ItemTypeEnum.number:
      return createNumberExtras();
    default:
      return createEmptyExtras();
  }
}
