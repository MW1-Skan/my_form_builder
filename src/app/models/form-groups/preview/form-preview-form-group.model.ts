import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormPreviewFormGroup = FormGroup<{
  elements: FormArray<ItemPreviewFormGroup>;
}>;

export function createFormPreviewFormGroup(): FormPreviewFormGroup {
  return new FormGroup({
    elements: new FormArray<ItemPreviewFormGroup>([]),
  });
}

export type ItemPreviewFormGroup = TextItemPreviewFormGroup | NumberItemPreviewFormGroup;

type SimpleItemPreviewFormGroup<T> = FormGroup<{
  value: FormControl<T | null>;
}>;

export type TextItemPreviewFormGroup = SimpleItemPreviewFormGroup<string>;

export function createTextItemPreviewForm(): TextItemPreviewFormGroup {
  return new FormGroup({
    value: new FormControl<string>(''),
  });
}

export type NumberItemPreviewFormGroup = SimpleItemPreviewFormGroup<number>;

export function createNumberItemPreviewForm(): NumberItemPreviewFormGroup {
  return new FormGroup({
    value: new FormControl<number | null>(null),
  });
}
