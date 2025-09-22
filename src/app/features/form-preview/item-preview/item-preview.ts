import { Component, effect, input, signal, viewChild, ViewContainerRef } from '@angular/core';
import {
  FormPreviewFormGroup,
  ItemPreviewFormGroup,
} from '../../../models/form-groups/preview/form-preview-form-group.model';
import { FormItem, ItemType, ItemTypeEnum } from '../../../models/form-item.model';
import { TextItemPreview } from './text-item-preview/text-item-preview';
import { NumberItemPreview } from './number-item-preview/number-item-preview';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { Form } from '../../../models/form.model';

@Component({
  selector: 'app-item-preview',
  imports: [],
  templateUrl: './item-preview.html',
  styleUrl: './item-preview.scss',
})
export class ItemPreview {
  vcr = viewChild('dynamicHost', { read: ViewContainerRef });

  item = input.required<FormItem>();

  form = input.required<Form | null>();

  formPreviewForm = input.required<FormPreviewFormGroup>();

  itemPreviewForm = signal<ItemPreviewFormGroup | null>(null);

  private itemComponentMap: Record<ItemType, any> = {
    [ItemTypeEnum.text]: TextItemPreview,
    [ItemTypeEnum.number]: NumberItemPreview,
  };

  constructor() {
    this.setItemPreviewForm();
    this.loadSpecificItemComponent();
  }

  setItemPreviewForm(): void {
    effect(() => {
      this.itemPreviewForm.set(this.getControlFor(this.item()));
    });
  }

  loadSpecificItemComponent(): void {
    effect(() => {
      const host = this.vcr();
      if (!host) return;
      host.clear();
      const type: ItemType = this.item().type;
      if (!type) return;
      const componentToDisplay = this.itemComponentMap[type];
      if (!componentToDisplay) return;
      const componentRef = host.createComponent(componentToDisplay);
      console.log('Item preview form :', this.itemPreviewForm()?.getRawValue());
      componentRef.setInput('itemPreviewForm', this.itemPreviewForm());
      componentRef.setInput('item', this.item());
    });
  }

  getControlFor(item: FormItem): ItemPreviewFormGroup | null {
    if (!this.form()) return null;
    const allItems = this.form()!.clusters.flatMap((c) => c.items);
    const index = allItems.indexOf(item);
    if (index === -1) return null;
    return this.formPreviewForm().controls.elements.at(index) as ItemPreviewFormGroup;
  }
}
