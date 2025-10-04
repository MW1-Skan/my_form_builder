import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementEditorFormGroup } from './item-editor-form-group.model';
import { FormInput } from '../../form.model';
import { RuleEditorFormGroup } from './rule-editor-form-group.model';

export type FormEditorFormGroup = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
  elements: FormArray<ElementEditorFormGroup>;
  rules: FormArray<RuleEditorFormGroup>;
}>;

export function createFormEditorForm(form?: FormInput): FormEditorFormGroup {
  return new FormGroup({
    title: new FormControl(form?.title ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(form?.description ?? '', { nonNullable: true }),
    elements: new FormArray<ElementEditorFormGroup>([]),
    rules: new FormArray<RuleEditorFormGroup>([]),
  });
}
