import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInput } from '../../models/form.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms-service';
import { FormItemEditor } from './form-item-editor/form-item-editor';
import { createFormItem, ItemFormGroup } from '../../models/form-groups/item-form-group.model';

@Component({
  selector: 'app-form-editor',
  imports: [
    FormItemEditor,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    Textarea,
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

  formDetailsForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
    description: new FormControl(''),
    itemsForms: new FormArray<ItemFormGroup>([]),
  });

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

  get itemsForms(): FormArray<ItemFormGroup> {
    return this.formDetailsForm.get('itemsForms') as FormArray<ItemFormGroup>;
  }

  addItem() {
    const itemGroup: ItemFormGroup = createFormItem();
    this.itemsForms.push(itemGroup);
  }

  removeItem(index: number) {
    this.itemsForms.removeAt(index);
  }

  save() {
    const inputForm: FormInput = {
      title: this.formDetailsForm.value.title!,
      description: this.formDetailsForm.value.description!,
      clusters: [],
      rules: [],
    };
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
