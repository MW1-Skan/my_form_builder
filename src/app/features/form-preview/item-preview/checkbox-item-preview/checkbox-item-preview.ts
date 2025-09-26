import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ValidationErrorMessage } from '../../../shared/validation-error-message/validation-error-message';
import { CheckboxItemPreviewFormGroup } from '../../../../models/form-groups/preview/form-preview-form-group.model';
import { FormItem, FormItemOption } from '../../../../models/form-item.model';
import { CheckboxExtras } from '../../../../models/item-extras.model';
import { Subscription } from 'rxjs';
import { isInvalid } from '../../../../utils/forms.utils';

@Component({
  selector: 'app-checkbox-item-preview',
  imports: [ReactiveFormsModule, CheckboxModule, ValidationErrorMessage],
  templateUrl: './checkbox-item-preview.html',
  styleUrl: './checkbox-item-preview.scss',
})
export class CheckboxItemPreview implements OnInit, OnDestroy {
  itemPreviewForm = input.required<CheckboxItemPreviewFormGroup>();

  item = input.required<FormItem>();

  extras = signal<CheckboxExtras | null>(null);

  get options(): FormItemOption[] {
    return this.item().options ?? [];
  }

  disabledOptions: FormItemOption[] = [];

  valueChangesSubscription: Subscription | null = null;

  get checkedCount(): number {
    return this.itemPreviewForm().controls.value.value?.length ?? 0;
  }

  get countText(): string {
    return this.getCountText();
  }

  ngOnInit(): void {
    const form = this.itemPreviewForm();
    const item = this.item();
    if (!form || !item) return;
    this.extras.set(item.extras as CheckboxExtras);
    this.initValidators(form);
    if (this.extras()?.forceMax) {
      this.subscribeToValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }

  private getCountText(): string {
    const minChecks = this.extras()?.minChecks;
    const maxChecks = this.extras()?.maxChecks;
    if (!minChecks && !maxChecks) return '';
    if (minChecks && maxChecks) {
      if (minChecks === maxChecks) {
        return `Choose exactly ${minChecks}. (${this.checkedCount}/${minChecks})`;
      } else {
        return `Choose between ${minChecks} and ${maxChecks}. (${this.checkedCount} checked)`;
      }
    } else if (minChecks) {
      return `Choose at least ${minChecks}. (${this.checkedCount}/${minChecks})`;
    } else {
      return `Choose at most ${maxChecks}. (${this.checkedCount}/${maxChecks})`;
    }
  }

  private initValidators(form: CheckboxItemPreviewFormGroup): void {
    const control = form.controls.value;
    if (!control) return;

    const extras = this.extras();
    if (!extras) return;

    const validators = [];

    // --- Required ---
    if (extras.required) {
      validators.push(Validators.required);
    }
    // --- Min checks ---
    if (extras.minChecks != null) {
      validators.push((c: AbstractControl): ValidationErrors | null => {
        const checkedCount: number = c.value.length ?? 0;
        return checkedCount < extras.minChecks ? { notEnoughChecks: true } : null;
      });
    }

    // --- Max checks ---
    if (extras.maxChecks != null) {
      validators.push((c: AbstractControl): ValidationErrors | null => {
        const checkedCount: number = c.value.length ?? 0;
        return checkedCount > extras.maxChecks ? { tooManyChecks: true } : null;
      });
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  private subscribeToValueChanges(): void {
    this.valueChangesSubscription = this.itemPreviewForm().controls.value.valueChanges.subscribe(
      (value) => {
        if (value?.length! >= this.extras()?.maxChecks!) {
          this.disabledOptions = this.options.filter((option) => {
            return !this.itemPreviewForm().controls.value.value?.some(
              (val: string) => val === option.value,
            );
          });
        } else {
          this.disabledOptions = [];
        }
      },
    );
  }

  isDisabled(option: FormItemOption): boolean {
    return this.disabledOptions.some((o) => o.value === option.value);
  }

  isInvalid(control: AbstractControl): boolean {
    return isInvalid(control, true);
  }
}
