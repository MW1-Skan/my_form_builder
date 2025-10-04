import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormItem } from '../../form-item.model';
import { generateId } from '../../../utils/id.utils';

export type FormPreviewFormGroup = FormGroup<{
  elements: FormArray<ItemPreviewFormGroup>;
}>;

export function createFormPreviewFormGroup(): FormPreviewFormGroup {
  return new FormGroup({
    elements: new FormArray<ItemPreviewFormGroup>([]),
  });
}

export type ItemPreviewFormGroup =
  | TextItemPreviewFormGroup
  | NumberItemPreviewFormGroup
  | DateItemPreviewFormGroup
  | RadioItemPreviewFormGroup
  | CheckboxItemPreviewFormGroup;

type SimpleItemPreviewFormGroup<T> = FormGroup<{
  id: FormControl<string>;
  value: FormControl<T | null>;
}>;

export type TextItemPreviewFormGroup = SimpleItemPreviewFormGroup<string>;

export function createTextItemPreviewForm(): TextItemPreviewFormGroup {
  return new FormGroup({
    id: new FormControl<string>(generateId(), { nonNullable: true }),
    value: new FormControl<string>(''),
  });
}

export type NumberItemPreviewFormGroup = SimpleItemPreviewFormGroup<number>;

export function createNumberItemPreviewForm(): NumberItemPreviewFormGroup {
  return new FormGroup({
    id: new FormControl<string>(generateId(), { nonNullable: true }),
    value: new FormControl<number | null>(null),
  });
}

export type DateItemPreviewFormGroup = SimpleItemPreviewFormGroup<Date | Date[]>;

export function createDateItemPreviewForm(): DateItemPreviewFormGroup {
  return new FormGroup({
    id: new FormControl<string>(generateId(), { nonNullable: true }),
    value: new FormControl<Date | Date[] | null>(null),
  });
}

export type RadioItemPreviewFormGroup = SimpleItemPreviewFormGroup<string | null>;

export function createRadioItemPreviewForm(): RadioItemPreviewFormGroup {
  return new FormGroup({
    id: new FormControl<string>(generateId(), { nonNullable: true }),
    value: new FormControl<string | null>(null),
  });
}

export type CheckboxItemPreviewFormGroup = SimpleItemPreviewFormGroup<string[]>;

export function createCheckboxItemPreviewForm(): CheckboxItemPreviewFormGroup {
  return new FormGroup({
    id: new FormControl<string>(generateId(), { nonNullable: true }),
    value: new FormControl<string[]>([]),
  });
}
