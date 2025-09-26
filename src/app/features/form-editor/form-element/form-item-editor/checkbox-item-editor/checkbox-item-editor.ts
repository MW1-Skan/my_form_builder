import { AfterViewInit, Component, input, OnDestroy } from '@angular/core';
import { ItemEditorFormGroup } from '../../../../../models/form-groups/editor/item-editor-form-group.model';
import { AbstractControl, FormArray, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import {
  createOptionEditorForm,
  OptionEditorFormGroup,
} from '../../../../../models/form-groups/editor/item-option-editor-form-group.model';
import { CheckboxExtrasEditorFormGroup } from '../../../../../models/form-groups/editor/item-extras-editor-form-group.model';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ValidationErrorMessage } from '../../../../shared/validation-error-message/validation-error-message';

import { slugify } from '../../../../../utils/string.utils';
import { hasError } from '../../../../../utils/forms.utils';

@Component({
  selector: 'app-checkbox-item-editor',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    ToggleSwitchModule,
    ValidationErrorMessage,
  ],
  templateUrl: './checkbox-item-editor.html',
  styleUrl: './checkbox-item-editor.scss',
})
export class CheckboxItemEditor implements AfterViewInit, OnDestroy {
  itemEditorForm = input.required<ItemEditorFormGroup>();

  get optionsEditorForm(): FormArray<OptionEditorFormGroup> {
    return this.itemEditorForm().controls.options as FormArray<OptionEditorFormGroup>;
  }

  get extrasEditorForm(): CheckboxExtrasEditorFormGroup {
    return this.itemEditorForm().controls.extras as CheckboxExtrasEditorFormGroup;
  }

  get maxChecks(): number | null {
    return this.extrasEditorForm.controls.maxChecks.value;
  }

  labelChangesSubscriptions: Subscription[] = [];

  ngAfterViewInit(): void {
    this.labelChangesSubscriptions.push(
      this.subscribeToLabelChanges(this.optionsEditorForm.controls.at(0)!),
    );
    this.initValidators();
  }

  ngOnDestroy(): void {
    this.labelChangesSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
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

  private initValidators() {
    // --- min < nombre d'options ---
    this.extrasEditorForm.controls.minChecks.addValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const val: number | null = control.value;
        if (val != null && val >= this.optionsEditorForm.length) {
          return { minTooBig: true };
        }
        return null;
      },
    );

    // --- règle multi-champs : min <= max ---
    this.extrasEditorForm.addValidators((group: AbstractControl): ValidationErrors | null => {
      const controls = (group as CheckboxExtrasEditorFormGroup).controls;
      const minChecks: number | null = controls.minChecks.value;
      const maxChecks: number | null = controls.maxChecks.value;

      if (minChecks != null && maxChecks != null && minChecks > maxChecks) {
        return { invalidRange: true };
      }
      return null;
    });

    this.extrasEditorForm.updateValueAndValidity();
  }

  isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string) {
    return hasError(control, errorName, true);
  }
}
