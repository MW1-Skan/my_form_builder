import { AfterViewInit, Component, input, OnDestroy } from '@angular/core';
import { ItemEditorFormGroup } from '../../../../../models/form-groups/editor/item-editor-form-group.model';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { TextExtrasEditorFormGroup } from '../../../../../models/form-groups/editor/item-extras-editor-form-group.model';
import { Subscription } from 'rxjs';
import { isTouchedOrDirtyAndHasError } from '../../../../../utils/forms.utils';
import { ValidationErrorMessage } from '../../../../shared/validation-error-message/validation-error-message';

@Component({
  selector: 'app-text-item-editor',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    TextareaModule,
    ToggleSwitchModule,
    ValidationErrorMessage,
  ],
  templateUrl: './text-item-editor.html',
  styleUrl: './text-item-editor.scss',
})
export class TextItemEditor implements AfterViewInit, OnDestroy {
  itemEditorForm = input.required<ItemEditorFormGroup>();

  get extrasEditorForm(): TextExtrasEditorFormGroup {
    return this.itemEditorForm().controls.extras as TextExtrasEditorFormGroup;
  }

  readonly LENGTH_LOWER_LIMIT: number = 0;

  readonly LENGTH_UPPER_LIMIT: number = 1000;

  private readonly MASK_REGEX: RegExp = /^[a9*\-'\(\),.%&#]*$/;

  private maskSubscription: Subscription | null = null;

  ngAfterViewInit(): void {
    this.subscribeToMaskChanges();
    this.initValidators();
  }

  ngOnDestroy(): void {
    this.maskSubscription?.unsubscribe();
  }

  private subscribeToMaskChanges() {
    this.maskSubscription = this.extrasEditorForm.controls.mask.valueChanges.subscribe(
      (maskValue) => {
        if (maskValue && maskValue !== '') {
          this.extrasEditorForm.controls.isLarge.setValue(false);
          this.extrasEditorForm.controls.isLarge.disable();
          this.extrasEditorForm.controls.isEmail.setValue(false);
          this.extrasEditorForm.controls.isEmail.disable();
        } else {
          this.extrasEditorForm.controls.isLarge.enable();
          this.extrasEditorForm.controls.isEmail.enable();
        }
      },
    );
  }

  private initValidators() {
    // --- mask valide ---
    this.extrasEditorForm.controls.mask.addValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const val: string = control.value ?? '';
        if (val !== '' && !this.MASK_REGEX.test(val)) {
          return { invalidMask: true };
        }
        return null;
      },
    );

    // --- règle multi-champs : minLength <= maxLength ---
    this.extrasEditorForm.addValidators((group: AbstractControl): ValidationErrors | null => {
      const controls = (group as TextExtrasEditorFormGroup).controls;
      const minLength: number | null = controls.minLength.value;
      const maxLength: number | null = controls.maxLength.value;

      if (minLength != null && maxLength != null && minLength > maxLength) {
        return { invalidLengthRange: true };
      }
      return null;
    });

    this.extrasEditorForm.updateValueAndValidity();
  }

  isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string) {
    return isTouchedOrDirtyAndHasError(control, errorName);
  }

  logExtras() {
    console.log('Extras :', this.extrasEditorForm.getRawValue());
  }
}
