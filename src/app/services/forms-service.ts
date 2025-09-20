import { inject, Injectable, signal } from '@angular/core';
import { Form, FormCluster, FormInput } from '../models/form.model';
import { generateId } from '../utils/id.utils';
import { FormFormGroup } from '../models/form-groups/form-form-group.model';
import {
  ElementFormGroup,
  ElementKindEnum,
  ItemFormGroup,
} from '../models/form-groups/item-form-group.model';
import { FormArray } from '@angular/forms';
import { FormItem } from '../models/form-item.model';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private formsSignal = signal<Form[]>([]);

  get forms() {
    return this.formsSignal.asReadonly();
  }

  getFormById(id: string): Form | undefined {
    return this.formsSignal().find((form) => form.id === id);
  }

  getEmptyForm(): FormInput {
    return {
      title: 'New form',
      clusters: [],
      rules: [],
    };
  }

  toFormInput(form: Form): FormInput {
    const { id, ...rest } = form;
    return rest;
  }

  addForm(newFormInput: FormInput): Form {
    const newFormId: string = generateId();
    const newForm: Form = {
      ...newFormInput,
      id: newFormId,
      lastModified: new Date(),
    };

    this.formsSignal.update((forms) => [...forms, newForm]);

    this.save(newForm);
    return newForm;
  }

  updateForm(id: string, updatedFormInput: FormInput): Form {
    let updatedForm: Form | undefined;

    this.formsSignal.update((forms) => {
      return forms.map((form) => {
        if (form.id === id) {
          updatedForm = {
            ...updatedFormInput,
            id: form.id,
            lastModified: new Date(),
          };
          return updatedForm;
        }
        return form;
      });
    });

    this.save(updatedForm);
    if (!updatedForm) {
      throw new Error(`Form with id "${id}" not found`);
    }
    return updatedForm;
  }

  deleteForm(id: string): Form {
    let deletedForm: Form | undefined;

    this.formsSignal.update((forms) => {
      const formToDelete = forms.find((form) => form.id === id);
      if (!formToDelete) {
        throw new Error(`Form with id "${id}" not found`);
      }
      deletedForm = formToDelete;
      return forms.filter((form) => form.id !== id);
    });

    this.save(deletedForm);
    return deletedForm!;
  }

  mapToFormInput(formDetails: FormFormGroup): FormInput {
    const formInput: FormInput = {
      title: formDetails.value.title!,
      description: formDetails.value.description!,
      clusters: this.mapToClusters(formDetails.controls.elements),
      rules: [],
    };
    return formInput;
  }

  mapToClusters(elementsForms: FormArray<ElementFormGroup>): FormCluster[] {
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

  isItem(element: ElementFormGroup): element is ItemFormGroup {
    return element.controls.kind.value === ElementKindEnum.ITEM;
  }

  isSeparator(element: ElementFormGroup): element is ElementFormGroup {
    return element.controls.kind.value === ElementKindEnum.SEPARATOR;
  }

  save(form?: Form) {
    // Todo
    console.log('Saving form to local storage :', form);
  }
}
