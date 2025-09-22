import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormEditorFormGroup } from '../models/form-groups/editor/form-editor-form-group.model';
import { ElementEditorFormGroup, ItemEditorFormGroup, ElementKindEnum, SeparatorEditorFormGroup } from '../models/form-groups/editor/item-editor-form-group.model';
import { FormItem } from '../models/form-item.model';
import { FormInput, FormCluster } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormEditorService {
  isItem(element: ElementEditorFormGroup): element is ItemEditorFormGroup {
    return element.controls.kind.value === ElementKindEnum.ITEM;
  }

  isSeparator(element: ElementEditorFormGroup): element is SeparatorEditorFormGroup {
    return element.controls.kind.value === ElementKindEnum.SEPARATOR;
  }

  mapToFormInput(formDetails: FormEditorFormGroup): FormInput {
    const formInput: FormInput = {
      title: formDetails.value.title!,
      description: formDetails.value.description!,
      clusters: this.mapToClusters(formDetails.controls.elements),
      rules: [],
    };
    return formInput;
  }

  mapToClusters(elementsForms: FormArray<ElementEditorFormGroup>): FormCluster[] {
    const clusters: FormCluster[] = [];
    let cluster: FormCluster = {
      items: [],
    };
    elementsForms.controls.forEach((elementForm) => {
      if (this.isItem(elementForm)) {
        const item: FormItem = elementForm.getRawValue() as FormItem;
        console.log('Item mapped :', item);
        cluster.items.push(item);
      } else if (this.isSeparator(elementForm)) {
        if (cluster.items.length > 0) {
          clusters.push(cluster);
          cluster = { items: [] };
        }
        cluster.title = elementForm.controls.title.value ?? undefined;
        cluster.description = elementForm.controls.description.value ?? undefined;
      }
    });
    if (cluster.items.length > 0) {
      clusters.push(cluster);
    }
    return clusters;
  }
}
