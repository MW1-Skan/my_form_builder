import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export function toggleControl(control: FormControl) {
  if (!control) return;
  if (control.disabled) {
    control.enable();
  } else {
    control.disable();
  }
}

export function hasError(
  control: AbstractControl,
  errorName: string,
  hasToBeTouchedOrDirty: boolean = true,
): boolean {
  return (
    control.hasError(errorName) && (!hasToBeTouchedOrDirty || control.touched || control.dirty)
  );
}

export function isInvalid(
  control: AbstractControl,
  hasToBeTouchedOrDirty: boolean = true,
): boolean {
  return control.invalid && (!hasToBeTouchedOrDirty || control.touched || control.dirty);
}

/**
 * Type guard utility to check if a FormGroup contains a specific control.
 */
export function hasControl<T extends FormGroup, K extends keyof T['controls']>(
  group: FormGroup,
  controlName: K,
): group is T {
  return group.get(controlName as string) !== null;
}
