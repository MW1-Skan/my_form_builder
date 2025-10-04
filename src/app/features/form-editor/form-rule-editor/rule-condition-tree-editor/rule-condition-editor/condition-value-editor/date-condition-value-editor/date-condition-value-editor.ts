import { Component, input } from '@angular/core';
import { ConditionForm } from '../../../../../../../models/form-groups/editor/rule-editor-form-group.model';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-date-condition-value-editor',
  imports: [ReactiveFormsModule, DatePickerModule],
  templateUrl: './date-condition-value-editor.html',
  styleUrl: './date-condition-value-editor.scss'
})
export class DateConditionValueEditor {
  conditionForm = input.required<ConditionForm>();
}
