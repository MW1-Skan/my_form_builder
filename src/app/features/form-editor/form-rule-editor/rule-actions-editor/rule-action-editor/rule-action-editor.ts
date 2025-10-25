import { Component, OnDestroy, computed, effect, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  ActionForm,
  UiActionForm,
} from '../../../../../models/form-groups/editor/rule-editor-form-group.model';
import { FormItem, ItemTypeEnum } from '../../../../../models/form-item.model';
import { isInvalid } from '../../../../../utils/forms.utils';

type UiActionOption = { label: string; value: 'show' | 'hide' | 'enable' | 'disable' | 'fill' };
type UiActionType = UiActionOption['value'];

@Component({
  selector: 'app-rule-action-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    MultiSelectModule,
    NgClass,
  ],
  templateUrl: './rule-action-editor.html',
  styleUrl: './rule-action-editor.scss',
})
export class RuleActionEditor implements OnDestroy {
  readonly actionForm = input.required<ActionForm>();
  readonly selectItems = input.required<FormItem[]>();

  readonly remove = output<void>();

  readonly targetItem = signal<FormItem | null>(null);

  readonly uiActionForm = computed(() => {
    const form = this.actionForm();
    return form.controls.type.value === 'ui' ? (form as UiActionForm) : null;
  });

  readonly actionOptions: UiActionOption[] = [
    { label: 'Show', value: 'show' },
    { label: 'Hide', value: 'hide' },
    { label: 'Enable', value: 'enable' },
    { label: 'Disable', value: 'disable' },
    { label: 'Fill', value: 'fill' },
  ];

  /**
   * Keeps the value control aligned with the current action and target item state.
   * Enables the field and applies validators for "fill" actions, otherwise clears and disables it.
   */
  private readonly syncValueControl = effect(() => {
    const form = this.uiActionForm();
    const items = this.selectItems();
    if (!form) return;

    const actionControl = form.controls.action;
    const formItemIdControl = form.controls.formItemId;
    const valueControl = form.controls.value;

    const resolveTarget = (id: string | null): FormItem | null =>
      items.find((item) => item.id === id) ?? null;

    const setTargetFromId = () => {
      const target = resolveTarget(formItemIdControl.value);
      this.targetItem.set(target);
      return target;
    };

    const ensureValueForItem = (item: FormItem) => {
      const currentValue = valueControl.value;
      switch (item.type) {
        case ItemTypeEnum.checkbox:
          if (!Array.isArray(currentValue)) {
            valueControl.setValue([], { emitEvent: false });
          }
          break;
        case ItemTypeEnum.number:
          if (typeof currentValue !== 'number') {
            valueControl.setValue(null, { emitEvent: false });
          }
          break;
        case ItemTypeEnum.date:
          if (!(currentValue instanceof Date)) {
            valueControl.setValue(null, { emitEvent: false });
          }
          break;
        case ItemTypeEnum.radio:
          if (typeof currentValue !== 'string') {
            valueControl.setValue(null, { emitEvent: false });
          }
          break;
        default:
          if (typeof currentValue !== 'string') {
            valueControl.setValue('', { emitEvent: false });
          }
      }
    };

    const updateValueControl = (action: UiActionType | null) => {
      const target = this.targetItem();
      if (action === 'fill' && target) {
        valueControl.setValidators([Validators.required]);
        if (valueControl.disabled) {
          valueControl.enable({ emitEvent: false });
        }
        ensureValueForItem(target);
      } else {
        valueControl.clearValidators();
        if (valueControl.enabled) {
          valueControl.disable({ emitEvent: false });
        }
        const currentValue = valueControl.value;
        if (currentValue !== null && currentValue !== undefined) {
          valueControl.setValue(null, { emitEvent: false });
        }
      }
      valueControl.updateValueAndValidity({ emitEvent: false });
    };

    setTargetFromId();
    updateValueControl(actionControl.value as UiActionType | null);

    const actionSub = actionControl.valueChanges.subscribe((value) => {
      updateValueControl(value as UiActionType | null);
    });

    const itemSub = formItemIdControl.valueChanges.subscribe((value) => {
      const target = resolveTarget(value as string | null);
      this.targetItem.set(target);
      updateValueControl(actionControl.value as UiActionType | null);
    });

    return () => {
      actionSub.unsubscribe();
      itemSub.unsubscribe();
    };
  });

  /**
   * Emits a removal event so the parent can delete this action entry.
   */
  removeAction(): void {
    this.remove.emit();
  }

  /**
   * Returns whether the given control is currently invalid (used for template feedback).
   */
  isControlInvalid(controlName: keyof UiActionForm['controls']): boolean {
    const form = this.uiActionForm();
    if (!form) return false;
    const control = form.controls[controlName];
    return isInvalid(control);
  }

  /**
   * Indicates whether the value input should be shown (only when filling a target item).
   */
  shouldShowValue(): boolean {
    const form = this.uiActionForm();
    if (!form) return false;
    return (form.controls.action.value ?? null) === 'fill' && this.targetItem() !== null;
  }

  /**
   * Cleans up the reactive effect when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.syncValueControl.destroy();
  }
}
