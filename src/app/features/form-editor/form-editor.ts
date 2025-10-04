import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormCluster, FormInput } from '../../models/form.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { AbstractControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { FormsService } from '../../services/forms-service';
import {
  createItemEditorForm,
  createSeparatorEditorForm,
  ElementEditorFormGroup,
  ElementKindEnum,
  ItemEditorFormGroup,
  SeparatorEditorFormGroup,
} from '../../models/form-groups/editor/item-editor-form-group.model';
import {
  createFormEditorForm,
  FormEditorFormGroup,
} from '../../models/form-groups/editor/form-editor-form-group.model';
import { FormElement } from './form-element/form-element';
import { FormEditorService } from '../../services/form-editor-service';
import { isInvalid } from '../../utils/forms.utils';
import { ValidationErrorMessage } from '../shared/validation-error-message/validation-error-message';
import { CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormElementCompact } from './form-element-compact/form-element-compact';
import {
  createRuleEditorFormGroup,
  RuleEditorFormGroup,
} from '../../models/form-groups/editor/rule-editor-form-group.model';
import { FormRuleEditor } from './form-rule-editor/form-rule-editor';
import { Rule } from '../../models/rule.model';

@Component({
  selector: 'app-form-editor',
  imports: [
    CdkDrag,
    CdkDropList,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    Textarea,
    FormElement,
    ValidationErrorMessage,
    FormElementCompact,
    FormRuleEditor,
  ],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss',
})
export class FormEditor implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly formsService = inject(FormsService);
  private readonly formEditorService = inject(FormEditorService);

  private formId: string | null = this.route.snapshot.paramMap.get('id');
  isEdit = signal(this.formId !== null);

  formEditorForm: FormEditorFormGroup = createFormEditorForm();

  titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  isDragging = signal(false);

  dragAndDropMode: boolean = false;

  constructor() {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.titleInput()?.nativeElement.focus();
  }

  initForm(): void {
    if (this.isEdit()) {
      const form: Form | null = this.formsService.getFormById(this.formId!);
      if (form) {
        this.formEditorForm.patchValue({
          title: form.title,
          description: form.description ?? '',
        });
        this.initElements(form.clusters);
        if (form.rules) this.initRules(form.rules);
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

  initRules(rules: Rule[]): void {
    rules.forEach((rule) => {
      const ruleEditorForm: RuleEditorFormGroup = createRuleEditorFormGroup(rule);
      this.formEditorForm.controls.rules.push(ruleEditorForm);
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

  get rulesEditorForms(): FormArray<RuleEditorFormGroup> {
    return this.formEditorForm.get('rules') as FormArray<RuleEditorFormGroup>;
  }

  addRule(): void {
    const ruleEditorForm: RuleEditorFormGroup = createRuleEditorFormGroup();
    this.rulesEditorForms.push(ruleEditorForm);
  }

  switchMode(): void {
    this.dragAndDropMode = !this.dragAndDropMode;
  }

  onDragStart(): void {
    this.isDragging.set(true);
  }

  onDragEnd(): void {
    this.isDragging.set(false);
  }

  drop(event: any): void {
    const controls = this.elementsEditorForms.controls;
    const previousIndex: number = event.previousIndex;
    const newIndex: number = event.currentIndex;
    const movedControl = controls[previousIndex];

    // Simuler la nouvelle position
    const simulated = [...controls];
    moveItemInArray(simulated, previousIndex, newIndex);

    // Vérifier qu'il n'y a pas de deux SEPARATOR consécutifs
    const hasConsecutiveSeparators = simulated.some((ctrl, i) => {
      return (
        ctrl.controls.kind.value === ElementKindEnum.SEPARATOR &&
        i < simulated.length - 1 &&
        simulated[i + 1].controls.kind.value === ElementKindEnum.SEPARATOR
      );
    });

    if (hasConsecutiveSeparators) {
      console.log('❌ Drop interdit : deux séparateurs consécutifs');
      return;
    }

    moveItemInArray(controls, previousIndex, newIndex);
    this.elementsEditorForms.updateValueAndValidity();
  }

  removeElement(index: number): void {
    this.elementsEditorForms.removeAt(index);
  }

  removeRule(index: number): void {
    this.rulesEditorForms.removeAt(index);
  }

  save(): void {
    this.formEditorForm.markAllAsTouched();
    if (this.formEditorForm.invalid) return;
    const inputForm: FormInput = this.formEditorService.mapToFormInput(this.formEditorForm);
    if (this.isEdit()) {
      this.formsService.updateForm(this.formId!, inputForm);
    } else {
      this.formsService.addForm(inputForm);
    }
    this.router.navigate(['/forms']);
  }

  cancel(): void {
    this.router.navigate(['/forms']);
  }

  isTouchedOrDirtyAndInvalid(control: AbstractControl): boolean {
    return isInvalid(control);
  }
}
