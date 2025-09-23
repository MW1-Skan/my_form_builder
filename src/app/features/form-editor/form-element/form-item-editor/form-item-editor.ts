import {
  Component,
  effect,
  input,
  output,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  createOptionEditorForm,
  OptionEditorFormGroup,
} from '../../../../models/form-groups/editor/item-option-editor-form-group.model';
import { ItemEditorFormGroup } from '../../../../models/form-groups/editor/item-editor-form-group.model';
import { ItemType, ItemTypeEnum } from '../../../../models/form-item.model';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FloatLabelModule } from 'primeng/floatlabel';
import { toTitleCase } from '../../../../utils/string.utils';
import { Subscription } from 'rxjs';
import { TextItemEditor } from './text-item-editor/text-item-editor';
import { NumberItemEditor } from './number-item-editor/number-item-editor';
import { createExtrasEditorFormFor } from '../../../../models/form-groups/editor/item-extras-editor-form-group.model';
import { isTouchedOrDirtyAndHasError } from '../../../../utils/forms.utils';
import { ItemExtras } from '../../../../models/item-extras.model';
import { DateItemEditor } from './date-item-editor/date-item-editor';

@Component({
  selector: 'app-form-item-editor',
  imports: [
    ReactiveFormsModule,
    SelectButtonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ToggleSwitchModule,
  ],
  templateUrl: './form-item-editor.html',
  styleUrl: './form-item-editor.scss',
})
export class FormItemEditor {
  itemEditorForm = input.required<ItemEditorFormGroup>();

  vcr = viewChild('dynamicHost', { read: ViewContainerRef });

  currentType = signal<ItemType | null>(null);

  itemTypeSelect = Object.values(ItemTypeEnum).map((type) => ({
    label: toTitleCase(type),
    value: type,
  }));

  private itemComponentMap: Record<ItemType, any> = {
    [ItemTypeEnum.text]: TextItemEditor,
    [ItemTypeEnum.number]: NumberItemEditor,
    [ItemTypeEnum.date]: DateItemEditor,
  };

  constructor() {
    this.subscribeToTypeChanges();
    this.loadSpecificItemComponent();
  }

  subscribeToTypeChanges() {
    let subscription: Subscription | null = null;
    effect(() => {
      subscription?.unsubscribe();
      const form: ItemEditorFormGroup = this.itemEditorForm();
      if (!form) return;
      const typeControl: FormControl<ItemType> = form.controls.type;
      if (!typeControl) return;
      this.currentType.set(typeControl.value);
      this.itemEditorForm().setControl(
        'extras',
        createExtrasEditorFormFor(this.currentType(), form.value.extras as ItemExtras),
      );
      subscription = typeControl.valueChanges.subscribe((type) => {
        console.log('Type changed to', type);
        this.currentType.set(type);
      });
    });
  }

  loadSpecificItemComponent() {
    effect(() => {
      const host = this.vcr();
      if (!host) return;
      host.clear();
      const type = this.currentType();
      if (!type) return;
      const componentToDisplay = this.itemComponentMap[type];
      if (!componentToDisplay) return;
      const componentRef = host.createComponent(componentToDisplay);
      componentRef.setInput('itemEditorForm', this.itemEditorForm());
    });
  }

  isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string) {
    return isTouchedOrDirtyAndHasError(control, errorName);
  }

  get options(): FormArray<OptionEditorFormGroup> {
    return this.itemEditorForm().get('options') as FormArray<OptionEditorFormGroup>;
  }

  addOption() {
    const option = createOptionEditorForm();
    this.options.push(option);
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  logItem() {
    console.log(this.itemEditorForm().getRawValue());
  }
}
