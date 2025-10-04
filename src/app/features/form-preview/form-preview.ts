import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormCluster } from '../../models/form.model';
import { FormsService } from '../../services/forms-service';
import {
  createCheckboxItemPreviewForm,
  createDateItemPreviewForm,
  createFormPreviewFormGroup,
  createNumberItemPreviewForm,
  createRadioItemPreviewForm,
  createTextItemPreviewForm,
  FormPreviewFormGroup,
  ItemPreviewFormGroup,
} from '../../models/form-groups/preview/form-preview-form-group.model';
import { FormItem, ItemType, ItemTypeEnum } from '../../models/form-item.model';
import { ReactiveFormsModule } from '@angular/forms';
import { SeparatorPreview } from './separator-preview/separator-preview';
import { ItemPreview } from './item-preview/item-preview';
import { ButtonModule } from 'primeng/button';
import { Action, Rule, RuleCondition, UiAction } from '../../models/rule.model';
import { OperatorTypeEnum } from '../../models/form-groups/editor/rule-editor-form-group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-preview',
  imports: [ReactiveFormsModule, ItemPreview, SeparatorPreview, ButtonModule],
  templateUrl: './form-preview.html',
  styleUrl: './form-preview.scss',
})
export class FormPreview implements OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly formsService = inject(FormsService);

  formPreviewForm: FormPreviewFormGroup = createFormPreviewFormGroup();

  form: Form | null = null;

  private formId: string | null = this.route.snapshot.paramMap.get('id');

  private itemIndexById = new Map<string, number>();
  private itemsById = new Map<string, FormItem>();
  private hiddenItems = new Set<string>();
  private disabledItems = new Set<string>();
  private valueChangesSub?: Subscription;

  constructor() {
    this.initForm();
  }

  initForm(): void {
    if (!this.formId) {
      console.warn(`Page not found, redirecting to forms list`);
      this.navigateToForms();
      return;
    }
    this.form = this.formsService.getFormById(this.formId!);
    if (this.form) {
      this.initElements(this.form.clusters);
      this.evaluateRules();
      this.valueChangesSub = this.formPreviewForm.valueChanges.subscribe(() => {
        this.evaluateRules();
      });
    } else {
      console.warn(`Form with id "${this.formId}" not found, redirecting to forms list`);
      this.navigateToForms();
    }
  }

  private initElements(clusters: FormCluster[]): void {
    this.formPreviewForm.controls.elements.clear();
    this.itemIndexById.clear();
    this.itemsById.clear();
    let globalIndex = 0;

    for (const cluster of clusters) {
      for (const item of cluster.items) {
        const group = this.createPreviewGroupFor(item);
        this.formPreviewForm.controls.elements.push(group);
        this.itemIndexById.set(item.id, globalIndex);
        this.itemsById.set(item.id, item);
        globalIndex++;
      }
    }
  }

  private createPreviewGroupFor(item: FormItem): ItemPreviewFormGroup {
    switch (item.type) {
      case ItemTypeEnum.text:
        return createTextItemPreviewForm();
      case ItemTypeEnum.number:
        return createNumberItemPreviewForm();
      case ItemTypeEnum.date:
        return createDateItemPreviewForm();
      case ItemTypeEnum.radio:
        return createRadioItemPreviewForm();
      case ItemTypeEnum.checkbox:
        return createCheckboxItemPreviewForm();
      default:
        return createTextItemPreviewForm();
    }
  }

  navigateToForms() {
    this.router.navigate(['/forms']);
  }

  submit() {
    this.formPreviewForm.markAllAsTouched();
    // TODO : handle submit (show toast if form is valid)
    console.log('Form result :', this.formPreviewForm.getRawValue());
  }

  isItemHidden(itemId: string): boolean {
    return this.hiddenItems.has(itemId);
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  private evaluateRules(): void {
    this.hiddenItems.clear();
    this.disabledItems.clear();

    this.formPreviewForm.controls.elements.controls.forEach((control) => {
      if (control.disabled) {
        control.enable({ emitEvent: false });
      }
    });

    if (!this.form?.rules || this.form.rules.length === 0) {
      return;
    }

    for (const rule of this.form.rules) {
      if (this.evaluateConditions(rule)) {
        for (const action of rule.apply ?? []) {
          this.applyAction(action);
        }
      }
    }

    const idsToDisable = new Set<string>([...this.disabledItems, ...this.hiddenItems]);
    idsToDisable.forEach((itemId) => {
      const control = this.getControlByItemId(itemId);
      control?.disable({ emitEvent: false });
    });
  }

  private evaluateConditions(rule: Rule): boolean {
    const when = rule.when;
    if (!when || !when.conditions || when.conditions.length === 0) {
      return false;
    }
    const results = when.conditions.map((condition) => this.evaluateCondition(condition));
    if (when.combinator === 'or') {
      return results.some(Boolean);
    }
    return results.every(Boolean);
  }

  private evaluateCondition(condition: RuleCondition): boolean {
    const control = this.getControlByItemId(condition.formItemId);
    const item = this.itemsById.get(condition.formItemId);
    if (!control || !item) return false;

    const currentValue = control.controls.value.value;
    const expectedValue = condition.value;

    switch (condition.operator) {
      case OperatorTypeEnum.EQUALS:
        return this.compareEquals(currentValue, expectedValue, item.type);
      case OperatorTypeEnum.NOT_EQUALS:
        return !this.compareEquals(currentValue, expectedValue, item.type);
      case OperatorTypeEnum.GREATER_THAN:
        return this.compareNumberLike(currentValue, expectedValue, item.type, (a, b) => a > b);
      case OperatorTypeEnum.GREATER_THAN_OR_EQUALS:
        return this.compareNumberLike(currentValue, expectedValue, item.type, (a, b) => a >= b);
      case OperatorTypeEnum.LESS_THAN:
        return this.compareNumberLike(currentValue, expectedValue, item.type, (a, b) => a < b);
      case OperatorTypeEnum.LESS_THAN_OR_EQUALS:
        return this.compareNumberLike(currentValue, expectedValue, item.type, (a, b) => a <= b);
      case OperatorTypeEnum.CONTAINS:
        return this.compareContains(currentValue, expectedValue);
      case OperatorTypeEnum.NOT_CONTAINS:
        return !this.compareContains(currentValue, expectedValue);
      default:
        return false;
    }
  }

  private applyAction(action: Action): void {
    if (!('action' in action)) {
      return;
    }
    const uiAction = action as UiAction;
    const targetItem = this.itemsById.get(uiAction.formItemId);
    if (!targetItem) return;

    switch (uiAction.action) {
      case 'hide':
        this.hiddenItems.add(uiAction.formItemId);
        break;
      case 'show':
        this.hiddenItems.delete(uiAction.formItemId);
        break;
      case 'disable':
        this.disabledItems.add(uiAction.formItemId);
        break;
      case 'enable':
        this.disabledItems.delete(uiAction.formItemId);
        break;
      case 'fill':
        this.applyFillAction(targetItem, uiAction.value);
        break;
    }
  }

  private applyFillAction(item: FormItem, rawValue: unknown): void {
    const control = this.getControlByItemId(item.id);
    if (!control) return;

    const normalized = this.normalizeFillValue(item, rawValue);
    if (normalized === undefined) return;

    control.controls.value.setValue(normalized as any, { emitEvent: false });
  }

  private normalizeFillValue(
    item: FormItem,
    rawValue: unknown,
  ): string | number | boolean | Date | string[] | null | undefined {
    const type = this.asItemType(item.type);
    switch (type) {
      case 'number': {
        const num = typeof rawValue === 'number' ? rawValue : Number(rawValue);
        return Number.isFinite(num) ? num : undefined;
      }
      case 'date': {
        if (rawValue instanceof Date && !isNaN(rawValue.getTime())) {
          return rawValue;
        }
        const parsed = new Date(rawValue as any);
        return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      case 'checkbox': {
        if (Array.isArray(rawValue)) {
          return rawValue.map((val) => String(val));
        }
        if (rawValue != null) {
          return [String(rawValue)];
        }
        return [];
      }
      case 'radio': {
        return rawValue == null ? null : String(rawValue);
      }
      default: {
        return rawValue == null ? '' : String(rawValue);
      }
    }
  }

  private getControlByItemId(itemId: string) {
    const index = this.itemIndexById.get(itemId);
    if (index == null) return null;
    return this.formPreviewForm.controls.elements.at(index) as ItemPreviewFormGroup;
  }

  private compareEquals(
    currentValue: any,
    expectedValue: any,
    itemType: ItemType | ItemTypeEnum,
  ): boolean {
    if (currentValue == null || expectedValue == null) {
      return currentValue === expectedValue;
    }

    const type = this.asItemType(itemType);

    if (type === 'date') {
      const currentTime =
        currentValue instanceof Date ? currentValue.getTime() : new Date(currentValue).getTime();
      const expectedTime =
        expectedValue instanceof Date
          ? expectedValue.getTime()
          : new Date(expectedValue).getTime();
      if (isNaN(currentTime) || isNaN(expectedTime)) return false;
      return currentTime === expectedTime;
    }

    if (type === 'number') {
      const currentNum = Number(currentValue);
      const expectedNum = Number(expectedValue);
      if (!Number.isFinite(currentNum) || !Number.isFinite(expectedNum)) return false;
      return currentNum === expectedNum;
    }

    if (Array.isArray(currentValue) || Array.isArray(expectedValue)) {
      const a = Array.isArray(currentValue) ? currentValue.map(String) : [String(currentValue)];
      const b = Array.isArray(expectedValue) ? expectedValue.map(String) : [String(expectedValue)];
      if (a.length !== b.length) return false;
      const setA = new Set(a);
      return b.every((val) => setA.has(val));
    }

    return String(currentValue) === String(expectedValue);
  }

  private compareNumberLike(
    currentValue: any,
    expectedValue: any,
    itemType: ItemType | ItemTypeEnum,
    comparator: (a: number, b: number) => boolean,
  ): boolean {
    if (currentValue == null || expectedValue == null) return false;
    const type = this.asItemType(itemType);
    if (type === 'date') {
      const currentTime =
        currentValue instanceof Date ? currentValue.getTime() : new Date(currentValue).getTime();
      const expectedTime =
        expectedValue instanceof Date
          ? expectedValue.getTime()
          : new Date(expectedValue).getTime();
      if (isNaN(currentTime) || isNaN(expectedTime)) return false;
      return comparator(currentTime, expectedTime);
    }
    const currentNum = Number(currentValue);
    const expectedNum = Number(expectedValue);
    if (!Number.isFinite(currentNum) || !Number.isFinite(expectedNum)) return false;
    return comparator(currentNum, expectedNum);
  }

  private compareContains(currentValue: any, expectedValue: any): boolean {
    if (currentValue == null || expectedValue == null) return false;
    if (Array.isArray(currentValue)) {
      if (Array.isArray(expectedValue)) {
        const set = new Set(currentValue.map(String));
        return expectedValue.every((val: any) => set.has(String(val)));
      }
      return currentValue.map(String).includes(String(expectedValue));
    }
    const current = String(currentValue).toLowerCase();
    const expected = String(expectedValue).toLowerCase();
    return current.includes(expected);
  }

  private asItemType(itemType: ItemType | ItemTypeEnum): ItemType {
    return itemType as ItemType;
  }
}
