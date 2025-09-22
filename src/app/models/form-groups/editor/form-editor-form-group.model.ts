import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ElementEditorFormGroup } from './item-editor-form-group.model';
import { FormInput } from '../../form.model';

export type FormEditorFormGroup = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
  elements: FormArray<ElementEditorFormGroup>;
}>;

export function createFormEditorForm(form?: FormInput): FormEditorFormGroup {
  return new FormGroup({
    title: new FormControl(form?.title ?? '', { nonNullable: true }),
    description: new FormControl(form?.description ?? '', { nonNullable: true }),
    elements: new FormArray<ElementEditorFormGroup>([]),
  });
}
