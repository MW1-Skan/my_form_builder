import { Component, inject, input, output } from '@angular/core';
import {
  ElementFormGroup,
  ElementKindEnum,
  ItemFormGroup,
  SeparatorFormGroup,
} from '../../../models/form-groups/item-form-group.model';
import { ButtonModule } from 'primeng/button';
import { FormSeparatorEditor } from './form-separator-editor/form-separator-editor';
import { FormItemEditor } from './form-item-editor/form-item-editor';
import { FormsService } from '../../../services/forms-service';

@Component({
  selector: 'app-form-element',
  imports: [ButtonModule, FormItemEditor, FormSeparatorEditor],
  templateUrl: './form-element.html',
  styleUrl: './form-element.scss',
})
export class FormElement {
  elementForm = input.required<ElementFormGroup>();
  remove = output<void>();

  formsService = inject(FormsService);

  isItem(): boolean {
    return this.formsService.isItem(this.elementForm());
  }

  isSeparator(): boolean {
    return this.formsService.isSeparator(this.elementForm());
  }

  get elementAsItem(): ItemFormGroup | null {
    return this.isItem() ? (this.elementForm() as ItemFormGroup) : null;
  }

  get elementAsSeparator(): SeparatorFormGroup | null {
    return this.isSeparator() ? (this.elementForm() as SeparatorFormGroup) : null;
  }

  removeElement() {
    this.remove.emit();
  }
}
