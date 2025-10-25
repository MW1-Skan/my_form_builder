import { Component, effect, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConditionForm } from '../../../../../../../models/form-groups/editor/rule-editor-form-group.model';
import { FormItemOption } from '../../../../../../../models/form-item.model';

@Component({
  selector: 'app-checkbox-condition-value-editor',
  imports: [ReactiveFormsModule, MultiSelectModule],
  templateUrl: './checkbox-condition-value-editor.html',
  styleUrl: './checkbox-condition-value-editor.scss',
})
export class CheckboxConditionValueEditor {
  conditionForm = input.required<ConditionForm>();
  options = input.required<FormItemOption[]>();

  constructor() {
    effect(() => {
      const control = this.conditionForm().controls.value;
      const value = control.value;
      if (!Array.isArray(value)) {
        control.setValue([], { emitEvent: false });
      }
    });
  }
}
