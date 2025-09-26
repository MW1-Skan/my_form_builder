import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { hasError } from '../../../utils/forms.utils';

@Component({
  selector: 'app-validation-error-message',
  imports: [],
  templateUrl: './validation-error-message.html',
  styleUrl: './validation-error-message.scss',
})
export class ValidationErrorMessage {
  controls = input.required<AbstractControl[]>();

  errorName = input.required<string>();

  errorNamesToExclude = input<string[]>();

  errorMessage = input.required<string>();

  hasToBeTouchedOrDirty = input<boolean>();

  showValidationMessage(
    controls: AbstractControl[],
    errorName: string,
    errorNamesToExclude: string[] = [],
    hasToBeTouchedOrDirty?: boolean,
  ): boolean {
    if (
      errorNamesToExclude.some((eName) =>
        controls.some((control) => hasError(control, eName, hasToBeTouchedOrDirty)),
      )
    )
      return false;
    return controls.some((control) => hasError(control, errorName, hasToBeTouchedOrDirty));
  }
}
