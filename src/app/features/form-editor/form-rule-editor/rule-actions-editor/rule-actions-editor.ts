import { Component, input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {
  ActionForm,
  createUiActionFormGroup,
} from '../../../../models/form-groups/editor/rule-editor-form-group.model';
import { FormItem } from '../../../../models/form-item.model';
import { RuleActionEditor } from './rule-action-editor/rule-action-editor';

@Component({
  selector: 'app-rule-actions-editor',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, RuleActionEditor],
  templateUrl: './rule-actions-editor.html',
  styleUrl: './rule-actions-editor.scss',
})
export class RuleActionsEditor {
  readonly actionsForm = input.required<FormArray<ActionForm>>();
  readonly selectItems = input.required<FormItem[]>();

  get hasActions(): boolean {
    return this.actionsForm().length > 0;
  }

  /**
   * Adds a new UI action form group at the end of the actions array.
   */
  addUiAction(): void {
    this.actionsForm().push(createUiActionFormGroup());
  }

  /**
   * Removes an action at the provided index.
   */
  removeAction(index: number): void {
    this.actionsForm().removeAt(index);
  }

  /**
   * Logs the current list of actions to the console for quick inspection.
   */
  logActions(): void {
    console.log('Actions:', this.actionsForm().getRawValue());
  }
}
