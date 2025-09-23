import { AfterViewInit, Component, input, OnDestroy } from '@angular/core';
import { ItemEditorFormGroup } from '../../../../../models/form-groups/editor/item-editor-form-group.model';
import { DateExtrasEditorFormGroup } from '../../../../../models/form-groups/editor/item-extras-editor-form-group.model';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ValidationErrorMessage } from '../../../../shared/validation-error-message/validation-error-message';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-item-editor',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    ToggleSwitchModule,
    ValidationErrorMessage,
  ],
  templateUrl: './date-item-editor.html',
  styleUrl: './date-item-editor.scss',
})
export class DateItemEditor implements AfterViewInit, OnDestroy {
  itemEditorForm = input.required<ItemEditorFormGroup>();

  get extrasEditorForm(): DateExtrasEditorFormGroup {
    return this.itemEditorForm().controls.extras as DateExtrasEditorFormGroup;
  }

  valueChangesSubs: Subscription[] = [];

  ngAfterViewInit(): void {
    this.subscribeToValueChanges();
    this.initValidators();
  }

  ngOnDestroy(): void {
    this.unsubscribeToValueChanges();
  }

  private subscribeToValueChanges(): void {
    const incompatibleToggleControls: FormControl<boolean>[] = [
      this.extrasEditorForm.controls.isRange,
      this.extrasEditorForm.controls.canType,
      this.extrasEditorForm.controls.showTime,
    ];
    incompatibleToggleControls.forEach((control) => {
      const otherControls = incompatibleToggleControls.filter((c) => c !== control);
      console.log('Control :', control);
      console.log('Other controls :', otherControls);
      this.subscribeToDisableOtherToggles(control, otherControls);
    });
  }

  private subscribeToDisableOtherToggles(
    toggleControl: FormControl<boolean>,
    toggleControlsToDisable: FormControl<boolean>[],
  ): void {
    this.valueChangesSubs.push(
      toggleControl.valueChanges.subscribe((value) => {
        if (value === true) {
          toggleControlsToDisable.forEach((control) => {
            control.setValue(false, { emitEvent: false });
            control.disable({ emitEvent: false });
          });
        } else {
          toggleControlsToDisable.forEach((control) => {
            control.enable({ emitEvent: false });
          });
        }
      }),
    );
  }

  private unsubscribeToValueChanges(): void {
    this.valueChangesSubs.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private initValidators(): void {
    // --- règle multi-champs : min < max ---
    this.extrasEditorForm.addValidators((group: AbstractControl): ValidationErrors | null => {
      const controls = (group as DateExtrasEditorFormGroup).controls;
      const minDate: Date | null = controls.minDate.value;
      const maxDate: Date | null = controls.maxDate.value;

      if (minDate != null && maxDate != null && minDate >= maxDate) {
        return { invalidRange: true };
      }
      return null;
    });

    this.extrasEditorForm.updateValueAndValidity();
  }
}
