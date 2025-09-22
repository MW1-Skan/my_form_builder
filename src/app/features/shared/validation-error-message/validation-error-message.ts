import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { isTouchedOrDirtyAndHasError } from '../../../utils/forms.utils';

@Component({
  selector: 'app-validation-error-message',
  imports: [],
  templateUrl: './validation-error-message.html',
  styleUrl: './validation-error-message.scss'
})
export class ValidationErrorMessage {
  control = input.required<AbstractControl>();

  errorName = input.required<string>();

  errorNamesToExclude = input<string[]>();

  errorMessage = input.required<string>();

  isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string, errorNamesToExclude: string[] = []) {
    if (errorNamesToExclude.some((error) => isTouchedOrDirtyAndHasError(control, error))) return false;
    return isTouchedOrDirtyAndHasError(control, errorName);
  }
}
