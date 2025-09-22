import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemTypeEnum, ItemType, FormItem } from '../../form-item.model';
import { OptionEditorFormGroup } from './item-option-editor-form-group.model';
import {
  createExtrasEditorFormFor,
  ExtrasEditorFormGroup,
} from './item-extras-editor-form-group.model';
import { FormCluster } from '../../form.model';

export type ItemEditorFormGroup = FormGroup<{
  question: FormControl<string>;
  type: FormControl<ItemType>;
  options: FormArray<OptionEditorFormGroup>;
  extras: ExtrasEditorFormGroup;
  kind: FormControl<ElementKindEnum>;
}>;

export type SeparatorEditorFormGroup = FormGroup<{
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  kind: FormControl<ElementKindEnum>;
}>;

export enum ElementKindEnum {
  ITEM = 'item',
  SEPARATOR = 'separator',
}

export type ElementEditorFormGroup = ItemEditorFormGroup | SeparatorEditorFormGroup;

export function createItemEditorForm(item?: FormItem): ItemEditorFormGroup {
  const defaultType: ItemType = ItemTypeEnum.text;
  return new FormGroup({
    question: new FormControl(item?.question ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl<ItemType>(item?.type ?? defaultType, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    options: new FormArray<OptionEditorFormGroup>([]), // TODO
    extras: createExtrasEditorFormFor(item?.type ?? defaultType, item?.extras),
    kind: new FormControl<ElementKindEnum>(ElementKindEnum.ITEM, { nonNullable: true }),
  });
}

export function createSeparatorEditorForm(cluster?: FormCluster): SeparatorEditorFormGroup {
  return new FormGroup({
    title: new FormControl<string | null>(cluster?.title ?? null),
    description: new FormControl<string | null>(cluster?.description ?? null),
    kind: new FormControl<ElementKindEnum>(ElementKindEnum.SEPARATOR, { nonNullable: true }),
  });
}
