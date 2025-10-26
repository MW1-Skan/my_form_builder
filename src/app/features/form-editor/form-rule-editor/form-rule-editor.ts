import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import {
  RuleEditorFormGroup,
} from '../../../models/form-groups/editor/rule-editor-form-group.model';
import { FormEditorFormGroup } from '../../../models/form-groups/editor/form-editor-form-group.model';
import { ElementEditorFormGroup } from '../../../models/form-groups/editor/item-editor-form-group.model';
import { FormEditorService } from '../../../services/form-editor-service';
import { Subscription } from 'rxjs';
import { FormItem } from '../../../models/form-item.model';
import { InputTextModule } from 'primeng/inputtext';
import { RuleConditionsEditor } from './rule-condition-tree-editor/rule-conditions-editor';
import { RuleActionsEditor } from './rule-actions-editor/rule-actions-editor';

@Component({
  selector: 'app-form-rule-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    InputTextModule,
    RuleConditionsEditor,
    RuleActionsEditor,
  ],
  templateUrl: './form-rule-editor.html',
  styleUrl: './form-rule-editor.scss',
})
export class FormRuleEditor implements OnInit {
  ruleEditorForm = input.required<RuleEditorFormGroup>();
  index = input.required<number>();

  conditionsForm = computed(() => this.ruleEditorForm().controls.when);
  actionsForm = computed(() => this.ruleEditorForm().controls.apply);

  formEditorForm = input.required<FormEditorFormGroup>();

  remove = output<void>();
  formEditorService = inject(FormEditorService);
  selectItems = signal<FormItem[]>([]);
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.formEditorForm().valueChanges.subscribe(() => {
      this.updateSelectItems();
    });

    this.updateSelectItems();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /** UI actions */
  removeRule(): void {
    this.remove.emit();
  }

  /** Helpers */
  private updateSelectItems(): void {
    const items: FormItem[] = [];
    this.formEditorForm().controls.elements.controls.forEach((element: ElementEditorFormGroup) => {
      if (this.formEditorService.isItem(element)) {
        items.push(element.getRawValue() as FormItem);
      }
    });
    this.selectItems.set(items);
  }

  logRule(): void {
    console.log('Rule:', this.ruleEditorForm().getRawValue());
  }
}
