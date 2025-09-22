import { FormControl, FormGroup, Validators } from '@angular/forms';

export type OptionEditorFormGroup = FormGroup<{
  value: FormControl<string>;
  label: FormControl<string>;
}>;

export function createOptionEditorForm(): OptionEditorFormGroup {
  return new FormGroup({
    value: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    label: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}
