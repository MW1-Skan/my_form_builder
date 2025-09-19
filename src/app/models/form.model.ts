import { FormItem } from './form-item.model';
import { Rule } from './rule.model';

export interface Form {
  id: string;
  title: string;
  lastModified: Date;
  description?: string;
  clusters: FormCluster[];
  rules?: Rule[];
}

interface FormCluster {
  id: string;
  formId: string;
  title?: string;
  description?: string;
  items: FormItem[];
}

export type FormInput = Omit<Form, 'id' | 'lastModified'>;
