import { FormItem } from './form-item.model';
import { Rule } from './rule.model';

/**
 * Fully qualified persisted form (with identifiers and metadata).
 */
export interface Form {
  id: string;
  title: string;
  lastModified: Date;
  description?: string;
  clusters: FormCluster[];
  rules?: Rule[];
}

/**
 * A logical group of items, optionally preceded by separator metadata.
 */
export interface FormCluster {
  title?: string;
  description?: string;
  items: FormItem[];
}

/**
 * Writable form payload used by the editor.
 */
export type FormInput = Omit<Form, 'id' | 'lastModified'>;
