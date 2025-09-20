import { AfterViewInit, Component, input } from '@angular/core';
import { ItemFormGroup } from '../../../../../models/form-groups/item-form-group.model';
import { NumberExtrasFormGroup } from '../../../../../models/form-groups/item-extras-form-group.model';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { isTouchedOrDirtyAndHasError } from '../../../../../utils/forms.utils';

@Component({
  selector: 'app-number-item-editor',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    ToggleSwitchModule,
  ],
  templateUrl: './number-item-editor.html',
  styleUrl: './number-item-editor.scss',
})
export class NumberItemEditor implements AfterViewInit {
  itemForm = input.required<ItemFormGroup>();

  get extrasForm(): NumberExtrasFormGroup {
    return this.itemForm().controls.extras as NumberExtrasFormGroup;
  }

  get placeholder(): string {
    return this.extrasForm.controls.placeholder.value ?? '';
  }

  get min(): number | null {
    return this.extrasForm.controls.min.value;
  }

  readonly DEFAULT_MIN = Number.NEGATIVE_INFINITY;

  get max(): number | null {
    return this.extrasForm.controls.max.value;
  }

  readonly DEFAULT_MAX = Number.POSITIVE_INFINITY;

  get forceLimits(): boolean {
    return this.extrasForm.controls.forceLimits.value;
  }

  get isDecimal(): boolean {
    return this.extrasForm.controls.isDecimal.value;
  }

  get maxFractionDigits(): number | null {
    return this.extrasForm.controls.maxFractionDigits.value;
  }

  readonly DEFAULT_MAX_FRACTION_DIGITS: number = 20;

  get showStepButtons(): boolean {
    return this.extrasForm.controls.showStepButtons.value;
  }

  get step(): number | null {
    return this.extrasForm.controls.step.value;
  }

  ngAfterViewInit(): void {
    this.initValidators();
  }

  private initValidators() {
    // --- step > 0 ---
    this.extrasForm.controls.step.addValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const val: number | null = control.value;
        if (val != null && val <= 0) {
          return { invalidStep: true };
        }
        return null;
      },
    );

    // --- règle multi-champs : min < max ---
    this.extrasForm.addValidators((group: AbstractControl): ValidationErrors | null => {
      const controls = (group as NumberExtrasFormGroup).controls;
      const min: number | null = controls.min.value;
      const max: number | null = controls.max.value;

      if (min != null && max != null && min >= max) {
        return { invalidRange: true };
      }
      return null;
    });

    this.extrasForm.updateValueAndValidity();
  }

  isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string) {
    return isTouchedOrDirtyAndHasError(control, errorName);
  }

  logExtras() {
    console.log('Extras :', this.extrasForm.getRawValue());
  }
}
