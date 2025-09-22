// item-editor-form-group.model.ts
import { FormControl, FormGroup } from '@angular/forms';
import { ItemType, ItemTypeEnum } from '../../form-item.model';
import { ItemExtras, NumberExtras, TextExtras } from '../../item-extras.model';

export type ExtrasEditorFormGroup =
  | TextExtrasEditorFormGroup
  | NumberExtrasEditorFormGroup
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

export function createNumberExtrasEditorForm(numberExtras?: NumberExtras): NumberExtrasEditorFormGroup {
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

export function createEmptyExtrasEditorForm(): EmptyExtrasEditorFormGroup {
  return new FormGroup({});
}

export function createExtrasEditorFormFor(type: ItemType | null, extras?: ItemExtras): ExtrasEditorFormGroup {
  switch (type) {
    case ItemTypeEnum.text:
      return createTextExtrasEditorForm(extras as TextExtras);
    case ItemTypeEnum.number:
      return createNumberExtrasEditorForm(extras as NumberExtras);
    default:
      return createEmptyExtrasEditorForm();
  }
}
