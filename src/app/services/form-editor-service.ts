import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormEditorFormGroup } from '../models/form-groups/editor/form-editor-form-group.model';
import {
  ElementEditorFormGroup,
  ItemEditorFormGroup,
  ElementKindEnum,
  SeparatorEditorFormGroup,
} from '../models/form-groups/editor/item-editor-form-group.model';
import { FormItem } from '../models/form-item.model';
import { FormInput, FormCluster } from '../models/form.model';
import { ConditionForm, RuleEditorFormGroup } from '../models/form-groups/editor/rule-editor-form-group.model';
import { Rule } from '../models/rule.model';

@Injectable({
  providedIn: 'root',
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
      rules: this.mapToRules(formDetails.controls.rules),
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

  mapToRules(rulesForms: FormArray<RuleEditorFormGroup>): Rule[] {
    const rules: Rule[] = [];
    rulesForms.controls.forEach((ruleForm) => {
      const rule: Rule = ruleForm.getRawValue() as Rule;
      rules.push(rule);
    });
    return rules;
  }

  // isCondition(treeForm: RuleConditionTreeForm): treeForm is ConditionForm {
  //   const nodeType = treeForm.controls.nodeType.value;
  //   return nodeType === 'condition';
  // }

  // isGroup(treeForm: RuleConditionTreeForm): treeForm is AndForm | OrForm {
  //   const nodeType = treeForm.controls.nodeType.value;
  //   return nodeType === 'and' || nodeType === 'or';
  // }

  // getChildren(form: RuleConditionTreeForm): RuleConditionTreeForm[] {
  //   if (this.isGroup(form)) return form.controls.children.controls;
  //   return [];
  // }

  // addAndCondition(): void {
  //   const newConditionTreeForm = createAndFormGroup(this.conditionTreeForm());
  //   this.setNewConditionTreeForm()(newConditionTreeForm);
  // }

  // removeCondition(root: RuleConditionTreeForm, target: RuleConditionTreeForm): boolean {
  //   // If the current node has no children, we exit
  //   if (!this.isGroup(root)) return false;
  //   const children = root.controls.children;
  //   if (!children) return false;

  //   // We iterate over the children
  //   for (let i = 0; i < children.length; i++) {
  //     const child = children.at(i);
  //     // If it's the leaf, we remove it
  //     if (child === target) {
  //       children.removeAt(i);
  //       return true;
  //     }
  //     // If it's not a leaf, we go down recursively
  //     const removed = this.removeCondition(child, target);
  //     if (removed) return true;
  //   }

  //   return false;
  // }
}
