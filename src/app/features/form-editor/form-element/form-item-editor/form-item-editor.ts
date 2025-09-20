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
  createFormItemOption,
  ItemOptionFormGroup,
} from '../../../../models/form-groups/item-option-form-group.model';
import { ItemFormGroup } from '../../../../models/form-groups/item-form-group.model';
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
import { createExtrasFormFor } from '../../../../models/form-groups/item-extras-form-group.model';
import { isTouchedOrDirtyAndHasError } from '../../../../utils/forms.utils';
import { ItemExtras } from '../../../../models/item-extras.model';

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
  itemForm = input.required<ItemFormGroup>();

  vcr = viewChild('dynamicHost', { read: ViewContainerRef });

  currentType = signal<ItemType | null>(null);

  itemTypeSelect = Object.values(ItemTypeEnum).map((type) => ({
    label: toTitleCase(type),
    value: type,
  }));

  private itemComponentMap: Record<ItemType, any> = {
    [ItemTypeEnum.text]: TextItemEditor,
    [ItemTypeEnum.number]: NumberItemEditor,
  };

  constructor() {
    this.subscribeToTypeChanges();
    this.loadSpecificItemComponent();
  }

  subscribeToTypeChanges() {
    let subscription: Subscription | null = null;
    effect(() => {
      subscription?.unsubscribe();
      const form: ItemFormGroup = this.itemForm();
      if (!form) return;
      const typeControl: FormControl<ItemType> = form.controls.type;
      if (!typeControl) return;
      this.currentType.set(typeControl.value);
      this.itemForm().setControl('extras', createExtrasFormFor(this.currentType(), form.value.extras as ItemExtras));
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
      componentRef.setInput('itemForm', this.itemForm());
    });
  }

  isTouchedOrDirtyAndHasError(control: AbstractControl, errorName: string) {
    return isTouchedOrDirtyAndHasError(control, errorName);
  }

  get options(): FormArray<ItemOptionFormGroup> {
    return this.itemForm().get('options') as FormArray<ItemOptionFormGroup>;
  }

  addOption() {
    const option = createFormItemOption();
    this.options.push(option);
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  logItem() {
    console.log(this.itemForm().getRawValue());
  }
}
