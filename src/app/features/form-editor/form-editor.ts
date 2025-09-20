import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInput } from '../../models/form.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { FormsService } from '../../services/forms-service';
import {
  createFormItem,
  createFormSeparator,
  ElementFormGroup,
  ItemFormGroup,
  SeparatorFormGroup,
} from '../../models/form-groups/item-form-group.model';
import { createFormFormGroup, FormFormGroup } from '../../models/form-groups/form-form-group.model';
import { FormElement } from './form-element/form-element';

@Component({
  selector: 'app-form-editor',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    Textarea,
    FormElement,
  ],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss',
})
export class FormEditor {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly formsService = inject(FormsService);

  private formId: string | null = this.route.snapshot.paramMap.get('id');
  isEdit = signal(this.formId !== null);

  formDetailsForm: FormFormGroup = createFormFormGroup();

  constructor() {
    this.initForm();
  }

  initForm() {
    console.log('Editing form with id: ', this.formId);
    if (this.isEdit()) {
      const form = this.formsService.getFormById(this.formId!);
      if (form) {
        this.formDetailsForm.patchValue({
          title: form.title,
          description: form.description ?? '',
        });
      } else {
        console.warn(`Form with id "${this.formId}" not found, redirecting to forms list`);
        this.router.navigate(['/forms']);
      }
    }
  }

  get elementsForms(): FormArray<ElementFormGroup> {
    return this.formDetailsForm.get('elements') as FormArray<ElementFormGroup>;
  }

  addItem(): void {
    const itemGroup: ItemFormGroup = createFormItem();
    this.elementsForms.push(itemGroup);
  }

  addSeparator(): void {
    if (this.canAddSeparator()) {
      const separatorGroup: SeparatorFormGroup = createFormSeparator();
      this.elementsForms.push(separatorGroup);
    }
  }

  canAddSeparator(): boolean {
    return this.elementsForms.controls.length === 0 || !this.isLastElementASeparator();
  }

  private isLastElementASeparator(): boolean {
    return (
      this.elementsForms.controls.length > 0 &&
      this.formsService.isSeparator(this.elementsForms.controls.at(-1)!)
    );
  }

  removeElement(index: number): void {
    this.elementsForms.removeAt(index);
  }

  save(): void {
    const inputForm: FormInput = this.formsService.mapToFormInput(this.formDetailsForm);
    if (this.isEdit()) {
      this.formsService.updateForm(this.formId!, inputForm);
    } else {
      this.formsService.addForm(inputForm);
    }
    this.router.navigate(['/forms']);
  }

  cancel() {
    this.router.navigate(['/forms']);
  }

  preview() {
    // TODO : implement preview
    this.router.navigate(['/preview']);
  }

  logForm() {
    console.log(this.formDetailsForm.getRawValue());
  }
}
