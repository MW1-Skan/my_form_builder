import { FormControl, FormGroup } from '@angular/forms';
import { ItemType, ItemTypeEnum } from '../../form-item.model';
import {
  CheckboxExtras,
  DateExtras,
  ItemExtras,
  NumberExtras,
  RadioExtras,
  TextExtras,
} from '../../item-extras.model';

export type ExtrasEditorFormGroup =
  | TextExtrasEditorFormGroup
  | NumberExtrasEditorFormGroup
  | DateExtrasEditorFormGroup
  | RadioExtrasEditorFormGroup
  | CheckboxExtrasEditorFormGroup
  | EmptyExtrasEditorFormGroup;

export type TextExtrasEditorFormGroup = FormGroup<{
  required: FormControl<boolean>;
  placeholder: FormControl<string | null>;
  isLarge: FormControl<boolean>;
  minLength: FormControl<number | null>;
  maxLength: FormControl<number | null>;
  mask: FormControl<string | null>;
  isEmail: FormControl<boolean>;
}>;

export type NumberExtrasEditorFormGroup = FormGroup<{
  required: FormControl<boolean>;
  placeholder: FormControl<string | null>;
  min: FormControl<number | null>;
  max: FormControl<number | null>;
  forceLimits: FormControl<boolean>;
  isDecimal: FormControl<boolean>;
  maxFractionDigits: FormControl<number | null>;
  showStepButtons: FormControl<boolean>;
  step: FormControl<number | null>;
}>;

export type DateExtrasEditorFormGroup = FormGroup<{
  required: FormControl<boolean>;
  placeholder: FormControl<string | null>;
  minDate: FormControl<Date | null>;
  maxDate: FormControl<Date | null>;
  showIcon: FormControl<boolean>;
  isRange: FormControl<boolean>;
  canType: FormControl<boolean>;
  showTime: FormControl<boolean>;
}>;

export type RadioExtrasEditorFormGroup = FormGroup<{
  required: FormControl<boolean>;
}>;

export type CheckboxExtrasEditorFormGroup = FormGroup<{
  required: FormControl<boolean>;
  minChecks: FormControl<number | null>;
  maxChecks: FormControl<number | null>;
  forceMax: FormControl<boolean>;
}>;

export type EmptyExtrasEditorFormGroup = FormGroup<{}>;

export function createTextExtrasEditorForm(textExtras?: TextExtras): TextExtrasEditorFormGroup {
  return new FormGroup({
    required: new FormControl<boolean>(textExtras?.required ?? false, { nonNullable: true }),
    placeholder: new FormControl<string | null>(textExtras?.placeholder ?? null),
    isLarge: new FormControl(textExtras?.isLarge ?? false, { nonNullable: true }),
    minLength: new FormControl<number | null>(textExtras?.minLength ?? null),
    maxLength: new FormControl<number | null>(textExtras?.maxLength ?? null),
    mask: new FormControl<string | null>(textExtras?.mask ?? null),
    isEmail: new FormControl(textExtras?.isEmail ?? false, { nonNullable: true }),
  });
}

export function createNumberExtrasEditorForm(
  numberExtras?: NumberExtras,
): NumberExtrasEditorFormGroup {
  return new FormGroup({
    required: new FormControl<boolean>(numberExtras?.required ?? false, { nonNullable: true }),
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

export function createDateExtrasEditorForm(dateExtras?: DateExtras): DateExtrasEditorFormGroup {
  return new FormGroup({
    required: new FormControl<boolean>(dateExtras?.required ?? false, { nonNullable: true }),
    placeholder: new FormControl<string | null>(dateExtras?.placeholder ?? null),
    minDate: new FormControl<Date | null>(dateExtras?.minDate ?? null),
    maxDate: new FormControl<Date | null>(dateExtras?.maxDate ?? null),
    showIcon: new FormControl<boolean>(dateExtras?.showIcon ?? false, { nonNullable: true }),
    isRange: new FormControl<boolean>(dateExtras?.isRange ?? false, { nonNullable: true }),
    canType: new FormControl<boolean>(dateExtras?.canType ?? false, { nonNullable: true }),
    showTime: new FormControl<boolean>(dateExtras?.showTime ?? false, { nonNullable: true }),
  });
}

export function createRadioExtrasEditorForm(radioExtras?: RadioExtras): RadioExtrasEditorFormGroup {
  return new FormGroup({
    required: new FormControl<boolean>(radioExtras?.required ?? false, { nonNullable: true }),
  });
}

export function createCheckboxExtrasEditorForm(
  checkboxExtras?: CheckboxExtras,
): CheckboxExtrasEditorFormGroup {
  return new FormGroup({
    required: new FormControl<boolean>(checkboxExtras?.required ?? false, { nonNullable: true }),
    minChecks: new FormControl<number | null>(checkboxExtras?.minChecks ?? null),
    maxChecks: new FormControl<number | null>(checkboxExtras?.maxChecks ?? null),
    forceMax: new FormControl<boolean>(checkboxExtras?.forceMax ?? false, { nonNullable: true }),
  });
}

export function createEmptyExtrasEditorForm(): EmptyExtrasEditorFormGroup {
  return new FormGroup({});
}

export function createExtrasEditorFormFor(
  type: ItemType | null,
  extras?: ItemExtras,
): ExtrasEditorFormGroup {
  switch (type) {
    case ItemTypeEnum.text:
      return createTextExtrasEditorForm(extras as TextExtras);
    case ItemTypeEnum.number:
      return createNumberExtrasEditorForm(extras as NumberExtras);
    case ItemTypeEnum.date:
      return createDateExtrasEditorForm(extras as DateExtras);
    case ItemTypeEnum.radio:
      return createRadioExtrasEditorForm(extras as RadioExtras);
    case ItemTypeEnum.checkbox:
      return createCheckboxExtrasEditorForm(extras as CheckboxExtras);
    default:
      return createEmptyExtrasEditorForm();
  }
}
