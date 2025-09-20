// item-form-group.model.ts
import { FormControl, FormGroup } from '@angular/forms';
import { ItemType, ItemTypeEnum } from '../form-item.model';
import { ItemExtras, NumberExtras, TextExtras } from '../item-extras.model';

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

export function createTextExtrasForm(textExtras?: TextExtras): TextExtrasFormGroup {
  return new FormGroup({
    placeholder: new FormControl<string | null>(textExtras?.placeholder ?? null),
    isLarge: new FormControl(textExtras?.isLarge ?? false, { nonNullable: true }),
    minLength: new FormControl<number | null>(textExtras?.minLength ?? null),
    maxLength: new FormControl<number | null>(textExtras?.maxLength ?? null),
    mask: new FormControl<string | null>(textExtras?.mask ?? null),
    isEmail: new FormControl(textExtras?.isEmail ?? false, { nonNullable: true }),
  });
}

export function createNumberExtrasForm(numberExtras?: NumberExtras): NumberExtrasFormGroup {
  return new FormGroup({
    placeholder: new FormControl<string | null>(numberExtras?.placeholder ?? null),
    min: new FormControl<number | null>(numberExtras?.min ?? null),
    max: new FormControl<number | null>(numberExtras?.max ?? null),
    forceLimits: new FormControl(numberExtras?.forceLimits ?? false, { nonNullable: true }),
    isDecimal: new FormControl(numberExtras?.isDecimal ?? false, { nonNullable: true }),
    maxFractionDigits: new FormControl<number | null>(numberExtras?.maxFractionDigits ?? null),
    showStepButtons: new FormControl(numberExtras?.showStepButtons ?? false, { nonNullable: true }),
    step: new FormControl<number | null>(numberExtras?.step ?? null),
  });
}

export function createEmptyExtrasForm(): EmptyExtrasFormGroup {
  return new FormGroup({});
}

export function createExtrasFormFor(type: ItemType | null, extras?: ItemExtras): ItemExtrasFormGroup {
  switch (type) {
    case ItemTypeEnum.text:
      return createTextExtrasForm(extras as TextExtras);
    case ItemTypeEnum.number:
      return createNumberExtrasForm(extras as NumberExtras);
    default:
      return createEmptyExtrasForm();
  }
}
