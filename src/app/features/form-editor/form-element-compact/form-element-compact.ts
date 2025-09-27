import { Component, inject, input } from '@angular/core';
import {
  ElementEditorFormGroup,
  ItemEditorFormGroup,
  SeparatorEditorFormGroup,
} from '../../../models/form-groups/editor/item-editor-form-group.model';
import { FormEditorService } from '../../../services/form-editor-service';
import { FormItemEditorCompact } from './form-item-editor-compact/form-item-editor-compact';
import { FormSeparatorEditorCompact } from './form-separator-editor-compact/form-separator-editor-compact';
import { ButtonModule } from 'primeng/button';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-element-compact',
  imports: [FormItemEditorCompact, FormSeparatorEditorCompact, ButtonModule, CdkDragHandle],
  templateUrl: './form-element-compact.html',
  styleUrl: './form-element-compact.scss',
})
export class FormElementCompact {
  elementEditorForm = input.required<ElementEditorFormGroup>();

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
}
