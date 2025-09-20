import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { createFormSeparator, ElementFormGroup } from './item-form-group.model';

export type FormFormGroup = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
  elements: FormArray<ElementFormGroup>;
}>;

export function createFormFormGroup(): FormFormGroup {
  return new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    elements: new FormArray<ElementFormGroup>([]),
  });
}
