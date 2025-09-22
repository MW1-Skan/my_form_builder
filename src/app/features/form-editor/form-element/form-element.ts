import { Component, inject, input, output } from '@angular/core';
import {
  ElementEditorFormGroup,
  ItemEditorFormGroup,
  SeparatorEditorFormGroup,
} from '../../../models/form-groups/editor/item-editor-form-group.model';
import { ButtonModule } from 'primeng/button';
import { FormSeparatorEditor } from './form-separator-editor/form-separator-editor';
import { FormItemEditor } from './form-item-editor/form-item-editor';
import { FormEditorService } from '../../../services/form-editor-service';

@Component({
  selector: 'app-form-element',
  imports: [ButtonModule, FormItemEditor, FormSeparatorEditor],
  templateUrl: './form-element.html',
  styleUrl: './form-element.scss',
})
export class FormElement {
  elementEditorForm = input.required<ElementEditorFormGroup>();
  remove = output<void>();

  formEditorService = inject(FormEditorService);

  isItem(): boolean {
    return this.formEditorService.isItem(this.elementEditorForm());
  }

  isSeparator(): boolean {
    return this.formEditorService.isSeparator(this.elementEditorForm());
  }

  get elementAsItem(): ItemEditorFormGroup | null {
    return this.isItem() ? (this.elementEditorForm() as ItemEditorFormGroup) : null;
  }

  get elementAsSeparator(): SeparatorEditorFormGroup | null {
    return this.isSeparator() ? (this.elementEditorForm() as SeparatorEditorFormGroup) : null;
  }

  removeElement() {
    this.remove.emit();
  }
}
