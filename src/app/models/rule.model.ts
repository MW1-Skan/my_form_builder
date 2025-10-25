import { OperatorType } from './form-groups/editor/rule-editor-form-group.model';
import { Validator } from './validator.model';

/**
 * Describes a rule that executes actions when its conditions evaluate to true.
 */
export interface Rule {
  when: RuleConditions;
  apply: Action[];
}

/**
 * A flat list of conditions combined with AND / OR.
 */
export type RuleConditions = {
  combinator: 'and' | 'or' | null;
  conditions: RuleCondition[];
}

// export type RuleConditionTree = RuleCondition | AndConditionTree | OrConditionTree;

/**
 * A single condition against another form item.
 */
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

/**
 * UI side-effect that targets another item (show/hide, enable/disable, fill).
 */
export interface UiAction {
  formItemId: string;
  action: 'show' | 'hide' | 'enable' | 'disable' | 'fill';
  value?: string | number | boolean | Date | string[] | null;
}

/**
 * Action that applies validators (currently unused in preview).
 */
export interface ValidatorAction {
  formItemId?: string | string[];
  validators: Validator[];
}
