import { AfterViewInit, Component, input } from '@angular/core';
import { ItemEditorFormGroup } from '../../../../../models/form-groups/editor/item-editor-form-group.model';
import { NumberExtrasEditorFormGroup } from '../../../../../models/form-groups/editor/item-extras-editor-form-group.model';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { ValidationErrorMessage } from '../../../../shared/validation-error-message/validation-error-message';

@Component({
  selector: 'app-number-item-editor',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    ToggleSwitchModule,
    ValidationErrorMessage,
  ],
  templateUrl: './number-item-editor.html',
  styleUrl: './number-item-editor.scss',
})
export class NumberItemEditor implements AfterViewInit {
  itemEditorForm = input.required<ItemEditorFormGroup>();

  get extrasEditorForm(): NumberExtrasEditorFormGroup {
    return this.itemEditorForm().controls.extras as NumberExtrasEditorFormGroup;
  }

  get min(): number | null {
    return this.extrasEditorForm.controls.min.value;
  }

  get max(): number | null {
    return this.extrasEditorForm.controls.max.value;
  }

  get isDecimal(): boolean {
    return this.extrasEditorForm.controls.isDecimal.value;
  }

  readonly DEFAULT_MAX_FRACTION_DIGITS: number = 20;

  get showStepButtons(): boolean {
    return this.extrasEditorForm.controls.showStepButtons.value;
  }

  ngAfterViewInit(): void {
    this.initValidators();
  }

  private initValidators() {
    // --- step > 0 ---
    this.extrasEditorForm.controls.step.addValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const val: number | null = control.value;
        if (val != null && val <= 0) {
          return { invalidStep: true };
        }
        return null;
      },
    );

    // --- règle multi-champs : min < max ---
    this.extrasEditorForm.addValidators((group: AbstractControl): ValidationErrors | null => {
      const controls = (group as NumberExtrasEditorFormGroup).controls;
      const min: number | null = controls.min.value;
      const max: number | null = controls.max.value;

      if (min != null && max != null && min >= max) {
        return { invalidRange: true };
      }
      return null;
    });

    this.extrasEditorForm.updateValueAndValidity();
  }

  logExtras() {
    console.log('Extras :', this.extrasEditorForm.getRawValue());
  }
}
