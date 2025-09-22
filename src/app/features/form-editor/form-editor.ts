import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormCluster, FormInput } from '../../models/form.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { FormsService } from '../../services/forms-service';
import {
  createItemEditorForm,
  createSeparatorEditorForm,
  ElementEditorFormGroup,
  ItemEditorFormGroup,
  SeparatorEditorFormGroup,
} from '../../models/form-groups/editor/item-editor-form-group.model';
import {
  createFormEditorForm,
  FormEditorFormGroup,
} from '../../models/form-groups/editor/form-editor-form-group.model';
import { FormElement } from './form-element/form-element';
import { FormEditorService } from '../../services/form-editor-service';

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
  private readonly formEditorService = inject(FormEditorService);

  private formId: string | null = this.route.snapshot.paramMap.get('id');
  isEdit = signal(this.formId !== null);

  formEditorForm: FormEditorFormGroup = createFormEditorForm();

  constructor() {
    this.initForm();
  }

  initForm(): void {
    console.log('Editing form with id: ', this.formId);
    if (this.isEdit()) {
      const form: Form | null = this.formsService.getFormById(this.formId!);
      if (form) {
        this.formEditorForm.patchValue({
          title: form.title,
          description: form.description ?? '',
        });
        this.initElements(form.clusters);
      } else {
        console.warn(`Form with id "${this.formId}" not found, redirecting to forms list`);
        this.router.navigate(['/forms']);
      }
    }
  }

  initElements(clusters: FormCluster[]): void {
    clusters.forEach((cluster) => {
      if (cluster.title || cluster.description) {
        const separatorElement: SeparatorEditorFormGroup = createSeparatorEditorForm(cluster);
        this.formEditorForm.controls.elements.push(separatorElement);
      }
      cluster.items.forEach((item) => {
        const itemElement: ItemEditorFormGroup = createItemEditorForm(item);
        itemElement.controls.extras.patchValue(item.extras);
        this.formEditorForm.controls.elements.push(itemElement);
      });
    });
  }

  get elementsEditorForms(): FormArray<ElementEditorFormGroup> {
    return this.formEditorForm.get('elements') as FormArray<ElementEditorFormGroup>;
  }

  addItem(): void {
    const itemEditorForm: ItemEditorFormGroup = createItemEditorForm();
    this.elementsEditorForms.push(itemEditorForm);
  }

  addSeparator(): void {
    if (this.canAddSeparator()) {
      const separatorEditorForm: SeparatorEditorFormGroup = createSeparatorEditorForm();
      this.elementsEditorForms.push(separatorEditorForm);
    }
  }

  canAddSeparator(): boolean {
    return this.elementsEditorForms.controls.length === 0 || !this.isLastElementASeparator();
  }

  private isLastElementASeparator(): boolean {
    return (
      this.elementsEditorForms.controls.length > 0 &&
      this.formEditorService.isSeparator(this.elementsEditorForms.controls.at(-1)!)
    );
  }

  removeElement(index: number): void {
    this.elementsEditorForms.removeAt(index);
  }

  save(): void {
    const inputForm: FormInput = this.formEditorService.mapToFormInput(this.formEditorForm);
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
    console.log(this.formEditorForm.getRawValue());
  }
}
