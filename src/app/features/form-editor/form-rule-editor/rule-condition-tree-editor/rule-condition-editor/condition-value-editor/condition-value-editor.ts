import { Component, Type, effect, input, signal, viewChild, ViewContainerRef } from '@angular/core';
import { ConditionForm } from '../../../../../../models/form-groups/editor/rule-editor-form-group.model';
import { FormItem, ItemType, ItemTypeEnum } from '../../../../../../models/form-item.model';
import { TextConditionValueEditor } from './text-condition-value-editor/text-condition-value-editor';
import { NumberConditionValueEditor } from './number-condition-value-editor/number-condition-value-editor';
import { DateConditionValueEditor } from './date-condition-value-editor/date-condition-value-editor';
import { RadioConditionValueEditor } from './radio-condition-value-editor/radio-condition-value-editor';
import { CheckboxConditionValueEditor } from './checkbox-condition-value-editor/checkbox-condition-value-editor';

@Component({
  selector: 'app-condition-value-editor',
  imports: [],
  templateUrl: './condition-value-editor.html',
  styleUrl: './condition-value-editor.scss'
})
export class ConditionValueEditor {
  conditionForm = input.required<ConditionForm>();
  selectedItem = input.required<FormItem>();
  currentType = signal<ItemType | null>(null);

  vcr = viewChild('dynamicHost', { read: ViewContainerRef });

  private conditionValueComponentMap: Record<ItemType, { component: Type<unknown>; withOptions?: boolean }> = {
    [ItemTypeEnum.text]: { component: TextConditionValueEditor },
    [ItemTypeEnum.number]: { component: NumberConditionValueEditor },
    [ItemTypeEnum.date]: { component: DateConditionValueEditor },
    [ItemTypeEnum.radio]: { component: RadioConditionValueEditor, withOptions: true },
    [ItemTypeEnum.checkbox]: { component: CheckboxConditionValueEditor, withOptions: true },
  };

  constructor() {
    effect(() => {
      if (!this.selectedItem() || !this.selectedItem().type) return;
      const type = this.selectedItem().type;
      if (type === this.currentType()) return;
      this.currentType.set(type);
      this.loadSpecificItemComponent(type);
    });
  }

  loadSpecificItemComponent(type: ItemType) {
    const host = this.vcr();
    if (!host) return;
    host.clear();
    if (!type) return;
    const config = this.conditionValueComponentMap[type];
    if (!config) return;
    this.normaliseValueForType(type);
    const componentRef = host.createComponent(config.component);
    componentRef.setInput('conditionForm', this.conditionForm());
    if (config.withOptions) {
      componentRef.setInput('options', this.selectedItem().options ?? []);
    }
  }

  private normaliseValueForType(type: ItemType) {
    const valueControl = this.conditionForm().controls.value;
    const currentValue = valueControl.value;
    if (type === ItemTypeEnum.checkbox) {
      if (!Array.isArray(currentValue)) {
        valueControl.setValue([], { emitEvent: false });
      }
      return;
    }
    if (Array.isArray(currentValue)) {
      valueControl.setValue(null, { emitEvent: false });
    }
  }
}
