import { Component, computed, effect, input, OnInit, signal } from '@angular/core';
import { TextItemPreviewFormGroup } from '../../../../models/form-groups/preview/form-preview-form-group.model';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormItem } from '../../../../models/form-item.model';
import { TextExtras } from '../../../../models/item-extras.model';
import { TextareaModule } from 'primeng/textarea';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { hasError, isInvalid } from '../../../../utils/forms.utils';
import { ValidationErrorMessage } from '../../../shared/validation-error-message/validation-error-message';

@Component({
  selector: 'app-text-item-preview',
  imports: [
    ReactiveFormsModule,
    InputMaskModule,
    InputTextModule,
    TextareaModule,
    ValidationErrorMessage,
  ],
  templateUrl: './text-item-preview.html',
  styleUrl: './text-item-preview.scss',
})
export class TextItemPreview implements OnInit {
  itemPreviewForm = input.required<TextItemPreviewFormGroup>();

  item = input.required<FormItem>();

  extras = signal<TextExtras | null>(null);

  get placeholder(): string {
    return this.extras()?.placeholder ?? '';
  }

  get isLarge(): boolean {
    return this.extras()?.isLarge ?? false;
  }

  get minLength(): number | null {
    return this.extras()?.minLength ?? null;
  }

  get maxLength(): number | null {
    return this.extras()?.maxLength ?? null;
  }

  get mask(): string {
    return this.extras()?.mask ?? '';
  }

  ngOnInit(): void {
    const form = this.itemPreviewForm();
    const item = this.item();
    if (!form || !item) return;
    this.extras.set(item.extras as TextExtras);
    this.initValidators(form);
    console.log('Form after init :', this.itemPreviewForm());
  }

  private initValidators(form: TextItemPreviewFormGroup): void {
    const control = form.controls.value;
    if (!control) return;

    const extras = this.extras();
    if (!extras) return;

    const validators = [];

    // --- Required ---
    if (extras.required) {
      validators.push(Validators.required);
    }

    // --- Email ---
    if (extras.isEmail) {
      validators.push(Validators.email);
    }

    // --- Min length ---
    if (extras.minLength != null) {
      validators.push((c: AbstractControl): ValidationErrors | null => {
        const val: string = c.value ?? '';
        return val.length < extras.minLength ? { tooShort: true } : null;
      });
    }

    // --- Max length ---
    if (extras.maxLength != null) {
      validators.push((c: AbstractControl): ValidationErrors | null => {
        const val: string = c.value ?? '';
        return val.length > extras.maxLength ? { tooLong: true } : null;
      });
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  isInvalid() {
    return isInvalid(this.itemPreviewForm());
  }
}
