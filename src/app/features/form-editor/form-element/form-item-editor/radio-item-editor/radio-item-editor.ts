import { AfterViewInit, Component, input } from '@angular/core';
import { ItemEditorFormGroup } from '../../../../../models/form-groups/editor/item-editor-form-group.model';
import {
  createOptionEditorForm,
  OptionEditorFormGroup,
} from '../../../../../models/form-groups/editor/item-option-editor-form-group.model';
import { AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { hasError } from '../../../../../utils/forms.utils';
import { Subscription } from 'rxjs';
import { RadioExtrasEditorFormGroup } from '../../../../../models/form-groups/editor/item-extras-editor-form-group.model';
import { ValidationErrorMessage } from '../../../../shared/validation-error-message/validation-error-message';
import { slugify } from '../../../../../utils/string.utils';

@Component({
  selector: 'app-radio-item-editor',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToggleSwitchModule,
    ValidationErrorMessage,
  ],
  templateUrl: './radio-item-editor.html',
  styleUrl: './radio-item-editor.scss',
})
export class RadioItemEditor implements AfterViewInit {
  itemEditorForm = input.required<ItemEditorFormGroup>();

  get optionsEditorForm(): FormArray<OptionEditorFormGroup> {
    return this.itemEditorForm().controls.options as FormArray<OptionEditorFormGroup>;
  }

  get extrasEditorForm(): RadioExtrasEditorFormGroup {
    return this.itemEditorForm().controls.extras as RadioExtrasEditorFormGroup;
  }

  labelChangesSubscriptions: Subscription[] = [];

  ngAfterViewInit(): void {
    console.log('Extras form :', this.extrasEditorForm.getRawValue());
    this.labelChangesSubscriptions.push(
      this.subscribeToLabelChanges(this.optionsEditorForm.controls.at(0)!),
    );
  }

  addOption(): void {
    const newOptionFormGroup: OptionEditorFormGroup = createOptionEditorForm();
    this.optionsEditorForm.push(newOptionFormGroup);
    this.subscribeToLabelChanges(newOptionFormGroup);
  }

  private subscribeToLabelChanges(optionFormGroup: OptionEditorFormGroup): Subscription {
    const subscription: Subscription = optionFormGroup.controls.label.valueChanges.subscribe(
      (label) => {
        if (!optionFormGroup.controls.value.dirty) {
          optionFormGroup.controls.value.setValue(slugify(label));
        }
      },
    );
    return subscription;
  }

  removeOption(index: number): void {
    this.optionsEditorForm.removeAt(index);
  }

  isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string): boolean {
    return hasError(control, errorName);
  }
}
