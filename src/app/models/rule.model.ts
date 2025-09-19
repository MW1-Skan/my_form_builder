import { Validator } from './validator.model';

export interface Rule {
  when: RuleConditionTree;
  apply: Action[];
}

type RuleConditionTree = RuleCondition | { and: RuleConditionTree[] } | { or: RuleConditionTree[] };

type RuleCondition =
  | {
      formItemId: string;
      operator: 'equals' | 'notEquals';
      value: string | number | boolean | Date;
    }
  | { formItemId: string; operator: 'greaterThan' | 'lessThan'; value: number | Date }
  | { formItemId: string; operator: 'contains' | 'notContains'; value: string | string[] };

type Action = UiAction | ValidatorAction;

interface UiAction {
  formItemId: string;
  action: 'show' | 'hide' | 'enable' | 'disable';
}

interface ValidatorAction {
  formItemId?: string | string[];
  validators: Validator[];
}
