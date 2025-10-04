import { OperatorType } from './form-groups/editor/rule-editor-form-group.model';
import { Validator } from './validator.model';

export interface Rule {
  when: RuleConditions;
  apply: Action[];
}

export type RuleConditions = {
  combinator: 'and' | 'or' | null;
  conditions: RuleCondition[];
}

// export type RuleConditionTree = RuleCondition | AndConditionTree | OrConditionTree;

export interface RuleCondition {
  formItemId: string;
  operator: OperatorType;
  value: string | number | boolean | Date | string[];
}

// export interface AndConditionTree {
//   nodeType: 'and';
//   children: RuleConditionTree[];
// }

// export interface OrConditionTree {
//   nodeType: 'or';
//   children: RuleConditionTree[];
// }

export type Action = UiAction | ValidatorAction;

export interface UiAction {
  formItemId: string;
  action: 'show' | 'hide' | 'enable' | 'disable' | 'fill';
  value?: string | number | boolean | Date | string[] | null;
}

export interface ValidatorAction {
  formItemId?: string | string[];
  validators: Validator[];
}
