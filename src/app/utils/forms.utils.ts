import { AbstractControl, FormControl } from '@angular/forms';

export function toggleControl(control: FormControl) {
  if (!control) return;
  if (control.disabled) {
    control.enable();
  } else {
    control.disable();
  }
}

export function isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string): boolean {
  return (control.touched || control.dirty) && control.hasError(errorName);
}
