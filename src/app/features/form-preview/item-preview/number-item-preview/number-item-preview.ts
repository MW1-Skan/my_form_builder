import { Component, input, OnInit, signal } from '@angular/core';
import { NumberItemPreviewFormGroup } from '../../../../models/form-groups/preview/form-preview-form-group.model';
import { FormItem } from '../../../../models/form-item.model';
import { NumberExtras } from '../../../../models/item-extras.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ValidationErrorMessage } from '../../../shared/validation-error-message/validation-error-message';
import { isTouchedOrDirtyAndIsInvalid } from '../../../../utils/forms.utils';

@Component({
  selector: 'app-number-item-preview',
  imports: [ReactiveFormsModule, InputNumberModule, ValidationErrorMessage],
  templateUrl: './number-item-preview.html',
  styleUrl: './number-item-preview.scss',
})
export class NumberItemPreview implements OnInit {
  itemPreviewForm = input.required<NumberItemPreviewFormGroup>();

  item = input.required<FormItem>();

  extras = signal<NumberExtras | null>(null);

  get placeholder(): string {
    return this.extras()?.placeholder ?? '';
  }

  get min(): number | null {
    return this.extras()?.min ?? null;
  }

  readonly DEFAULT_MIN = Number.NEGATIVE_INFINITY;

  get max(): number | null {
    return this.extras()?.max ?? null;
  }

  readonly DEFAULT_MAX = Number.POSITIVE_INFINITY;

  get forceLimits(): boolean {
    return this.extras()?.forceLimits ?? false;
  }

  get isDecimal(): boolean {
    return this.extras()?.isDecimal ?? false;
  }

  get maxFractionDigits(): number | null {
    return this.extras()?.maxFractionDigits ?? null;
  }

  readonly DEFAULT_MAX_FRACTION_DIGITS: number = 20;

  get showStepButtons(): boolean {
    return this.extras()?.showStepButtons ?? false;
  }

  get step(): number | null {
    return this.extras()?.step ?? null;
  }

  ngOnInit(): void {
    const form = this.itemPreviewForm();
    const item = this.item();
    if (!form || !item) return;
    this.extras.set(item.extras as NumberExtras);
    this.initValidators(form);
  }

  private initValidators(form: NumberItemPreviewFormGroup): void {
    const control = form.controls.value;
    if (!control) return;

    const extras = this.extras();
    if (!extras) return;

    const validators = [];

    // --- Required ---
    if (extras.required) {
      validators.push(Validators.required);
    }

    // --- Min ---
    if (extras.min != null && !extras.forceLimits) {
      validators.push((c: AbstractControl): ValidationErrors | null => {
        const val: number = c.value ?? null;
        return val < extras.min ? { tooLow: true } : null;
      });
    }

    // --- Max ---
    if (extras.max != null && !extras.forceLimits) {
      validators.push((c: AbstractControl): ValidationErrors | null => {
        const val: number = c.value ?? null;
        return val > extras.max ? { tooBig: true } : null;
      });
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  isInvalid(): boolean {
    return isTouchedOrDirtyAndIsInvalid(this.itemPreviewForm());
  }
}
