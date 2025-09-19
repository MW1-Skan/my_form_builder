import { FormControl, FormGroup, Validators } from '@angular/forms';

export type ItemOptionFormGroup = FormGroup<{
  value: FormControl<string>;
  label: FormControl<string>;
}>;

export function createFormItemOption(): ItemOptionFormGroup {
  return new FormGroup({
    value: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    label: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}
