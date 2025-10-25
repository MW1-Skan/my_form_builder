import { Component, input } from '@angular/core';
import { ConditionForm } from '../../../../../../../models/form-groups/editor/rule-editor-form-group.model';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-condition-value-editor',
  imports: [ReactiveFormsModule, InputNumberModule],
  templateUrl: './number-condition-value-editor.html',
  styleUrl: './number-condition-value-editor.scss'
})
export class NumberConditionValueEditor {
  conditionForm = input.required<ConditionForm>();
}
