import { Component, input } from '@angular/core';
import { ItemEditorFormGroup } from '../../../../models/form-groups/editor/item-editor-form-group.model';

@Component({
  selector: 'app-form-item-editor-compact',
  imports: [],
  templateUrl: './form-item-editor-compact.html',
  styleUrl: './form-item-editor-compact.scss',
})
export class FormItemEditorCompact {
  itemEditorForm = input.required<ItemEditorFormGroup>();

  get question(): string {
    return this.itemEditorForm().controls.question.value;
  }
}
