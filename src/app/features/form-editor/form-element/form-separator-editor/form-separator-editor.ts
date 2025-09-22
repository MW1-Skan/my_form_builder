import { Component, input, signal } from '@angular/core';
import { SeparatorEditorFormGroup } from '../../../../models/form-groups/editor/item-editor-form-group.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-form-separator-editor',
  imports: [ReactiveFormsModule, ButtonModule, FloatLabelModule, InputTextModule, Textarea],
  templateUrl: './form-separator-editor.html',
  styleUrl: './form-separator-editor.scss',
})
export class FormSeparatorEditor {
  separatorForm = input.required<SeparatorEditorFormGroup>();

  hasTitle = signal(true);

  hasDescription = signal(true);

  toggleTitleButton() {
    this.hasTitle.update((val) => !val);
  }

  toggleDescriptionButton() {
    this.hasDescription.update((val) => !val);
  }
}
