import { Component, computed, input, output } from '@angular/core';
import { ConditionForm, OperatorType, OperatorTypeEnum } from '../../../../../models/form-groups/editor/rule-editor-form-group.model';
import { FormItem, ItemType, ItemTypeEnum } from '../../../../../models/form-item.model';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ConditionValueEditor } from './condition-value-editor/condition-value-editor';
import { ButtonModule } from 'primeng/button';

export const OrderOperators: OperatorType[] = [
  OperatorTypeEnum.EQUALS,
  OperatorTypeEnum.NOT_EQUALS,
  OperatorTypeEnum.GREATER_THAN,
  OperatorTypeEnum.GREATER_THAN_OR_EQUALS,
  OperatorTypeEnum.LESS_THAN,
  OperatorTypeEnum.LESS_THAN_OR_EQUALS,
]

export const TextOperators: OperatorType[] = [
  OperatorTypeEnum.EQUALS,
  OperatorTypeEnum.NOT_EQUALS,
  OperatorTypeEnum.CONTAINS,
  OperatorTypeEnum.NOT_CONTAINS,
]

export const EqualityOperators: OperatorType[] = [
  OperatorTypeEnum.EQUALS,
  OperatorTypeEnum.NOT_EQUALS,
]

export const ItemTypeOperatorMap: Record<ItemType, OperatorType[]> = {
  [ItemTypeEnum.text]: TextOperators,
  [ItemTypeEnum.number]: OrderOperators,
  [ItemTypeEnum.date]: OrderOperators,
  [ItemTypeEnum.radio]: EqualityOperators,
  [ItemTypeEnum.checkbox]: EqualityOperators,
};

export const OperatorStringMap: Record<OperatorType, string> = {
  [OperatorTypeEnum.EQUALS]: '=',
  [OperatorTypeEnum.NOT_EQUALS]: '!=',
  [OperatorTypeEnum.GREATER_THAN]: '>',
  [OperatorTypeEnum.GREATER_THAN_OR_EQUALS]: '>=',
  [OperatorTypeEnum.LESS_THAN]: '<',
  [OperatorTypeEnum.LESS_THAN_OR_EQUALS]: '<=',
  [OperatorTypeEnum.CONTAINS]: 'Contains',
  [OperatorTypeEnum.NOT_CONTAINS]: 'Not contains',
}

const ItemTypeLabelMap: Record<ItemType, string> = {
  [ItemTypeEnum.text]: 'Text',
  [ItemTypeEnum.number]: 'Number',
  [ItemTypeEnum.date]: 'Date',
  [ItemTypeEnum.radio]: 'Radio',
  [ItemTypeEnum.checkbox]: 'Checkbox',
};

@Component({
  selector: 'app-rule-condition-editor',
  imports: [ReactiveFormsModule, SelectModule, ButtonModule, InputTextModule, ConditionValueEditor],
  templateUrl: './rule-condition-editor.html',
  styleUrl: './rule-condition-editor.scss',
})
export class RuleConditionEditor {
  readonly conditionForm = input.required<ConditionForm>();

  readonly numberOfConditions = input.required<number>();

  readonly selectItems = input.required<FormItem[]>();

  readonly remove = output<void>();

  readonly selectedItem = computed(() => {
    const itemId = this.conditionForm().controls.formItemId.value;
    return this.selectItems().find((i) => i.id === itemId) || null;
  })

  readonly selectedItemTypeLabel = computed(() => {
    const item = this.selectedItem();
    if (!item) return '';
    return ItemTypeLabelMap[item.type] ?? item.type;
  });

  readonly operators = computed(() => {
    const selectedItem = this.selectedItem();
    if (!selectedItem) return [];
    return ItemTypeOperatorMap[selectedItem.type] || [];
  });

  readonly selectOperators = computed(() => {
    return this.operators().map((op) => ({
      label: OperatorStringMap[op] || op,
      value: op,
    }))
  })

  readonly canRemoveCondition = computed(() => this.numberOfConditions() > 1);

  removeCondition() {
    this.remove.emit();
  }
}
