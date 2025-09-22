import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormCluster } from '../../models/form.model';
import { FormsService } from '../../services/forms-service';
import { createFormPreviewFormGroup, createNumberItemPreviewForm, createTextItemPreviewForm, FormPreviewFormGroup, ItemPreviewFormGroup, NumberItemPreviewFormGroup, TextItemPreviewFormGroup } from '../../models/form-groups/preview/form-preview-form-group.model';
import { ItemTypeEnum } from '../../models/form-item.model';
import { ReactiveFormsModule } from '@angular/forms';
import { SeparatorPreview } from './separator-preview/separator-preview';
import { ItemPreview } from './item-preview/item-preview';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-preview',
  imports: [ReactiveFormsModule, ItemPreview, SeparatorPreview, ButtonModule],
  templateUrl: './form-preview.html',
  styleUrl: './form-preview.scss',
})
export class FormPreview {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly formsService = inject(FormsService);

  formPreviewForm: FormPreviewFormGroup = createFormPreviewFormGroup();

  form: Form | null = null;

  private formId: string | null = this.route.snapshot.paramMap.get('id');

  constructor() {
    this.initForm();
  }

  initForm(): void {
    if (!this.formId) {
      console.warn(`Page not found, redirecting to forms list`);
      this.navigateToForms();
      return;
    }
    console.log('Previewing form with id: ', this.formId);
    this.form = this.formsService.getFormById(this.formId!);
    if (this.form) {
      this.initElements(this.form.clusters);
    } else {
      console.warn(`Form with id "${this.formId}" not found, redirecting to forms list`);
      this.navigateToForms();
    }
  }

  private initElements(clusters: FormCluster[]): void {
    const groups: ItemPreviewFormGroup[] = [];
    for (const cluster of clusters) {
      for (const item of cluster.items) {
        switch (item.type) {
          case ItemTypeEnum.text:
            const textItemPreviewForm: TextItemPreviewFormGroup = createTextItemPreviewForm();
            // TODO : init validators setValidators(group: ItemPreviewFormGroup, item: FormItem)
            groups.push(textItemPreviewForm);
            break;
          case 'number':
            const numberItemPreviewForm: NumberItemPreviewFormGroup = createNumberItemPreviewForm();
            // TODO : init validators setValidators(group: ItemPreviewFormGroup, item: FormItem)
            groups.push(numberItemPreviewForm);
        }
      }
    }
    
    groups.forEach((group: ItemPreviewFormGroup) => {
      this.formPreviewForm.controls.elements.push(group);
    });
  }

  navigateToForms() {
    this.router.navigate(['/forms']);
  }

  submit() {
    // TODO : handle submit (show toast if form is valid)
    console.log('Form result :', this.formPreviewForm.getRawValue());
  }
}
