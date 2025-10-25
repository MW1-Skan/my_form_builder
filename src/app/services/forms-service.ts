import { Injectable, signal } from '@angular/core';
import { Form, FormInput } from '../models/form.model';
import { generateId } from '../utils/id.utils';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private formsSignal = signal<Form[]>(this.getFormsFromLocalStorage());

  /**
   * Readonly list of stored forms, backed by a signal.
   */
  get forms() {
    return this.formsSignal.asReadonly();
  }

  /**
   * Hydrates the forms array from localStorage, reviving date fields.
   */
  private getFormsFromLocalStorage(): Form[] {
    const dateKeys: string[] = ['lastModified', 'minDate', 'maxDate'];
    const raw = localStorage.getItem('forms');
    const forms = raw
      ? (JSON.parse(raw, (key, value) => {
          if (dateKeys.includes(key) && typeof value === 'string') {
            const d = new Date(value);
            return isNaN(d.getTime()) ? value : d;
          }
          return value;
        }) as Form[])
      : [];
    return forms;
  }

  /**
   * Returns a form that matches the provided ID or null when missing.
   */
  getFormById(id: string): Form | null {
    return this.formsSignal().find((form) => form.id === id) ?? null;
  }

  /**
   * Produces a template input object for a brand-new form.
   */
  getEmptyForm(): FormInput {
    return {
      title: 'New form',
      clusters: [],
      rules: [],
    };
  }

  /**
   * Converts a fully qualified form into a FormInput payload (without ID metadata).
   */
  toFormInput(form: Form): FormInput {
    const { id, ...rest } = form;
    return rest;
  }

  /**
   * Adds a new form, assigns it an ID, persists the store, and returns it.
   */
  addForm(newFormInput: FormInput): Form {
    const newFormId: string = generateId();
    const newForm: Form = {
      ...newFormInput,
      id: newFormId,
      lastModified: new Date(),
    };

    this.formsSignal.update((forms) => [newForm, ...forms]);

    this.save();
    return newForm;
  }

  /**
   * Updates an existing form with the provided payload and refreshes the sort order.
   */
  updateForm(id: string, updatedFormInput: FormInput): Form {
    let updatedForm: Form | undefined;

    this.formsSignal.update((forms) => {
      const updatedForms: Form[] = forms.map((form) => {
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

      return updatedForms.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
    });

    this.save();
    if (!updatedForm) {
      throw new Error(`Form with id "${id}" not found`);
    }
    return updatedForm;
  }

  /**
   * Deletes the requested form, returns the removed entity, and persists changes.
   */
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

  /**
   * Persists the current signal state into localStorage.
   */
  save() {
    localStorage.setItem('forms', JSON.stringify(this.formsSignal()));
    console.log('Saving forms to local storage', this.formsSignal());
  }
}
