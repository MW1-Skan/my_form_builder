import { Component, input } from '@angular/core';
import { SeparatorEditorFormGroup } from '../../../../models/form-groups/editor/item-editor-form-group.model';

@Component({
  selector: 'app-form-separator-editor-compact',
  imports: [],
  templateUrl: './form-separator-editor-compact.html',
  styleUrl: './form-separator-editor-compact.scss',
})
export class FormSeparatorEditorCompact {
  separatorForm = input.required<SeparatorEditorFormGroup>();

  get titleDisplayed(): string {
    const title: string = this.separatorForm().controls.title.value ?? '';
    const description: string = this.separatorForm().controls.description.value ?? '';
    if (title !== '') return title;
    return description;
  }
}
