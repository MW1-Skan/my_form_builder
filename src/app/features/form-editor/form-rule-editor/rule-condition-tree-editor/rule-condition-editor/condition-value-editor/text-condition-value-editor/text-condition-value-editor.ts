import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ConditionForm } from '../../../../../../../models/form-groups/editor/rule-editor-form-group.model';

@Component({
  selector: 'app-text-condition-value-editor',
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './text-condition-value-editor.html',
  styleUrl: './text-condition-value-editor.scss'
})
export class TextConditionValueEditor {
  conditionForm = input.required<ConditionForm>();
}
