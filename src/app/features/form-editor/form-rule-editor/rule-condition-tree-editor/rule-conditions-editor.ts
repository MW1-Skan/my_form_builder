import { Component, computed, effect, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import {
  createConditionFormGroup,
  RuleConditionsForm,
} from '../../../../models/form-groups/editor/rule-editor-form-group.model';
import { ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../models/form-item.model';
import { RuleConditionEditor } from './rule-condition-editor/rule-condition-editor';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormEditorService } from '../../../../services/form-editor-service';
import { Subscription } from 'rxjs';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-rule-conditions-editor',
  imports: [ReactiveFormsModule, RuleConditionEditor, ButtonModule, SplitButtonModule, UpperCasePipe],
  templateUrl: './rule-conditions-editor.html',
  styleUrl: './rule-conditions-editor.scss',
})
export class RuleConditionsEditor implements OnInit, OnDestroy {
  readonly conditionsForm = input.required<RuleConditionsForm>();
  readonly selectItems = input.required<FormItem[]>();
  readonly formEditorService = inject(FormEditorService);
  readonly combinator = signal<'and' | 'or' | null>(null);

  combinatorValueChangesSub: Subscription | null = null;

  readonly numberOfConditions = signal(0);

  /**
   * Tracks the number of conditions whenever the form updates.
   */
  constructor() {
    effect(() => {
      const form = this.conditionsForm();
      this.numberOfConditions.set(form.controls.conditions.length);
    });
  }

  /**
   * Subscribes to the combinator control so the UI reflects AND/OR selection.
   */
  ngOnInit(): void {
    this.combinatorValueChangesSub = this.conditionsForm().controls.combinator.valueChanges.subscribe((value) => {
      this.combinator.set(value);
    });
  }

  /**
   * Cleans up the combinator subscription.
   */
  ngOnDestroy(): void {
    this.combinatorValueChangesSub?.unsubscribe();
  }

  readonly combinatorSelectButton = computed(() => {
    const combinator = this.combinator();
    return [
      {
        label: 'AND',
        command: () => this.addCondition('and'),
        disabled: combinator === 'or',
      },
      {
        label: 'OR',
        command: () => this.addCondition('or'),
        disabled: combinator === 'and',
      },
    ];
  });

  /**
   * Logs the current condition tree (useful during development).
   */
  logConditions(): void {
    console.log('Conditions:', this.conditionsForm().getRawValue());
    console.log('numberOfConditions:', this.numberOfConditions());
  }

  /**
   * Appends a new condition and sets the combinator if needed.
   */
  addCondition(combinator?: 'and' | 'or'): void {
    const form = this.conditionsForm();
    if (combinator) {
      form.controls.combinator.setValue(combinator);
    } else if (form.controls.combinator.value === null) {
      form.controls.combinator.setValue('and');
    }
    form.controls.conditions.push(createConditionFormGroup());
    this.updateNumberOfConditions();
  }

  /**
   * Removes a condition and resets the combinator when only one remains.
   */
  removeCondition(index: number): void {
    const form = this.conditionsForm();
    form.controls.conditions.removeAt(index);
    if (form.controls.conditions.length === 1) {
      form.controls.combinator.setValue(null);
    }
    this.updateNumberOfConditions();
  }

  /**
   * Updates the stored count of conditions for the template.
   */
  private updateNumberOfConditions(): void {
    this.numberOfConditions.set(this.conditionsForm().controls.conditions.length);
  }
}
