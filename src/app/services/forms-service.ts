import { Injectable, signal } from '@angular/core';
import { Form, FormInput } from '../models/form.model';
import { generateId } from '../utils/id.utils';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private formsSignal = signal<Form[]>(JSON.parse(localStorage.getItem('forms') ?? '[]'));

  get forms() {
    return this.formsSignal.asReadonly();
  }

  getFormById(id: string): Form | null {
    return this.formsSignal().find((form) => form.id === id) ?? null;
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

    this.save();
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

    this.save();
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

    this.save();
    return deletedForm!;
  }

  save() {
    localStorage.setItem('forms', JSON.stringify(this.formsSignal()));
    console.log('Saving forms to local storage');
  }
}
