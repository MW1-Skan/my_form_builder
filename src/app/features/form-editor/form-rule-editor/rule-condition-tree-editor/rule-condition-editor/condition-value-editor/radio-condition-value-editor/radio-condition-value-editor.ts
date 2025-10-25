import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ConditionForm } from '../../../../../../../models/form-groups/editor/rule-editor-form-group.model';
import { FormItemOption } from '../../../../../../../models/form-item.model';

@Component({
  selector: 'app-radio-condition-value-editor',
  imports: [ReactiveFormsModule, SelectModule],
  templateUrl: './radio-condition-value-editor.html',
  styleUrl: './radio-condition-value-editor.scss',
})
export class RadioConditionValueEditor {
  conditionForm = input.required<ConditionForm>();
  options = input.required<FormItemOption[]>();
}
