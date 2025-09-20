import { AfterViewInit, Component, input, OnDestroy } from '@angular/core';
import { ItemFormGroup } from '../../../../../models/form-groups/item-form-group.model';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { TextExtrasFormGroup } from '../../../../../models/form-groups/item-extras-form-group.model';
import { Subscription } from 'rxjs';
import { isTouchedOrDirtyAndHasError } from '../../../../../utils/forms.utils';

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
  ],
  templateUrl: './text-item-editor.html',
  styleUrl: './text-item-editor.scss',
})
export class TextItemEditor implements AfterViewInit, OnDestroy {
  itemForm = input.required<ItemFormGroup>();

  get extrasForm(): TextExtrasFormGroup {
    return this.itemForm().controls.extras as TextExtrasFormGroup;
  }

  get placeholder(): string {
    return this.extrasForm.controls.placeholder.value ?? '';
  }

  get isLarge(): boolean {
    return this.extrasForm.controls.isLarge.value;
  }

  get minLength(): number | null {
    return this.extrasForm.controls.minLength.value;
  }

  get maxLength(): number | null {
    return this.extrasForm.controls.maxLength.value;
  }

  readonly LENGTH_LOWER_LIMIT: number = 0;

  readonly LENGTH_UPPER_LIMIT: number = 1000;

  get mask(): string {
    return this.extrasForm.controls.mask.value ?? '';
  }

  private readonly MASK_REGEX: RegExp = /^[a9*\-'\(\),.%&#]*$/;

  private maskSubscription: Subscription | null = null;

  get isEmail(): boolean {
    return this.extrasForm.controls.isEmail.value;
  }

  ngAfterViewInit(): void {
    this.subscribeToMaskChanges();
    this.initValidators();
  }

  ngOnDestroy(): void {
    this.maskSubscription?.unsubscribe();
  }

  private subscribeToMaskChanges() {
    this.maskSubscription = this.extrasForm.controls.mask.valueChanges.subscribe((maskValue) => {
      if (maskValue && maskValue !== '') {
        this.extrasForm.controls.isLarge.setValue(false);
        this.extrasForm.controls.isLarge.disable();
        this.extrasForm.controls.isEmail.setValue(false);
        this.extrasForm.controls.isEmail.disable();
      } else {
        this.extrasForm.controls.isLarge.enable();
        this.extrasForm.controls.isEmail.enable();
      }
    });
  }

  private initValidators() {
    // --- mask valide ---
    this.extrasForm.controls.mask.addValidators(
      (control: AbstractControl): ValidationErrors | null => {
        const val: string = control.value ?? '';
        if (val !== '' && !this.MASK_REGEX.test(val)) {
          return { invalidMask: true };
        }
        return null;
      },
    );

    // --- règle multi-champs : minLength <= maxLength ---
    this.extrasForm.addValidators((group: AbstractControl): ValidationErrors | null => {
      const controls = (group as TextExtrasFormGroup).controls;
      const minLength: number | null = controls.minLength.value;
      const maxLength: number | null = controls.maxLength.value;

      if (minLength != null && maxLength != null && minLength > maxLength) {
        return { invalidLengthRange: true };
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
