import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormItemOption, ItemType, ItemTypeEnum } from '../../form-item.model';

export type OptionEditorFormGroup = FormGroup<{
  value: FormControl<string>;
  label: FormControl<string>;
}>;

export function createOptionEditorForm(option?: FormItemOption): OptionEditorFormGroup {
  return new FormGroup({
    value: new FormControl(option?.value ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    label: new FormControl(option?.label ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}

export function createOptionsEditorFormArrayFor(
  type: ItemType | null,
  options?: FormItemOption[],
): FormArray<OptionEditorFormGroup> {
  const emptyFormArray = new FormArray<OptionEditorFormGroup>([]);
  switch (type) {
    case ItemTypeEnum.text:
      return emptyFormArray;
    case ItemTypeEnum.number:
      return emptyFormArray;
    case ItemTypeEnum.date:
      return emptyFormArray;
    case ItemTypeEnum.radio:
      return createOptionsEditorFormArray(options);
    default:
      return emptyFormArray;
  }
}

export function createOptionsEditorFormArray(
  options?: FormItemOption[],
): FormArray<OptionEditorFormGroup> {
  const optionsFormArray: FormArray<OptionEditorFormGroup> = new FormArray<OptionEditorFormGroup>(
    [],
  );
  if (options) {
    options.forEach((option) => {
      optionsFormArray.push(createOptionEditorForm(option));
    });
    return optionsFormArray;
  }
  optionsFormArray.push(createOptionEditorForm());
  return optionsFormArray;
}
