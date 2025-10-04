import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../validator.model';
import { FormItem } from '../../form-item.model';
import { Action, Rule, RuleCondition, RuleConditions } from '../../rule.model';

export type RuleEditorFormGroup = FormGroup<{
  when: RuleConditionsForm;
  apply: FormArray<ActionForm>;
}>;

export function createRuleEditorFormGroup(rule?: Rule): RuleEditorFormGroup {
  return new FormGroup({
    when: createConditionsFormGroup(rule?.when),
    apply: new FormArray<ActionForm>((rule?.apply ?? []).map((a) => createActionFormGroup(a))),
  });
}

// --- Rules Tree ---

export enum OperatorTypeEnum {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  GREATER_THAN = 'greaterThan',
  LESS_THAN = 'lessThan',
  GREATER_THAN_OR_EQUALS = 'greaterThanOrEquals',
  LESS_THAN_OR_EQUALS = 'lessThanOrEquals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
}

export type OperatorType = OperatorTypeEnum;

export type valueType = string | number | boolean | Date | string[];

export type RuleConditionsForm = FormGroup<{
  combinator: FormControl<'and' | 'or' | null>;
  conditions: FormArray<ConditionForm>;
}>;

export function createConditionsFormGroup(conditions?: RuleConditions): RuleConditionsForm {
  return new FormGroup({
    combinator: new FormControl<'and' | 'or' | null>(conditions?.combinator ?? null),
    conditions: new FormArray<ConditionForm>(
      (conditions?.conditions ?? [undefined]).map((c) => createConditionFormGroup(c))
    ),
  })
}

export type ConditionForm = FormGroup<{
  formItemId: FormControl<string | null>;
  operator: FormControl<OperatorType | null>;
  value: FormControl<valueType | null>;
}>;

export function createConditionFormGroup(condition?: RuleCondition): ConditionForm {
  return new FormGroup({
    formItemId: new FormControl<string | null>(condition?.formItemId ?? null, Validators.required),
    operator: new FormControl<OperatorType | null>(condition?.operator ?? null, Validators.required),
    value: new FormControl<valueType | null>(condition?.value ?? null, Validators.required),
  });
}
// export type RuleConditionTreeForm = ConditionForm | AndForm | OrForm;

// export function createConditionTreeFormGroup(tree?: RuleConditionTree): RuleConditionTreeForm {
//   if (!tree) {
//     return createConditionFormGroup();
//   }

//   if (tree.nodeType === 'and') {
//     return new FormGroup({
//       nodeType: new FormControl<'and'>('and', { nonNullable: true }),
//       children: new FormArray<RuleConditionTreeForm>(
//         tree.children.map((c) => createConditionTreeFormGroup(c)),
//       ),
//     });
//   }

//   if (tree.nodeType === 'or') {
//     return new FormGroup({
//       nodeType: new FormControl<'or'>('or', { nonNullable: true }),
//       children: new FormArray<RuleConditionTreeForm>(
//         tree.children.map((c) => createConditionTreeFormGroup(c)),
//       ),
//     });
//   }

//   const conditionFormGroup = createConditionFormGroup(tree.formItemId);
//   conditionFormGroup.patchValue(tree);
//   return conditionFormGroup;
// }


// export type AndForm = FormGroup<{
//   nodeType: FormControl<'and'>;
//   children: FormArray<RuleConditionTreeForm>;
// }>;

// export function createAndFormGroup(
//   treeA?: RuleConditionTreeForm,
//   treeB?: RuleConditionTreeForm,
// ): AndForm {
//   if (!treeA) treeA = createConditionFormGroup();
//   if (!treeB) treeB = createConditionFormGroup();
//   return new FormGroup({
//     nodeType: new FormControl<'and'>('and', { nonNullable: true }),
//     children: new FormArray<RuleConditionTreeForm>([treeA, treeB]),
//   });
// }

// export type OrForm = FormGroup<{
//   nodeType: FormControl<'or'>;
//   children: FormArray<RuleConditionTreeForm>;
// }>;

// export function createOrFormGroup(
//   treeA?: RuleConditionTreeForm,
//   treeB?: RuleConditionTreeForm,
// ): OrForm {
//   if (!treeA) treeA = createConditionFormGroup();
//   if (!treeB) treeB = createConditionFormGroup();
//   return new FormGroup({
//     nodeType: new FormControl<'or'>('or', { nonNullable: true }),
//     children: new FormArray<RuleConditionTreeForm>([treeA, treeB]),
//   });
// }

// --- Rule actions ---

export type ActionForm = UiActionForm | ValidatorActionForm;

export function createActionFormGroup(action?: Action): ActionForm {
  if (!action) {
    return createUiActionFormGroup();
  }

  if ('action' in action) {
    // UiAction
    return createUiActionFormGroup(action);
  }

  // ValidatorAction
  const fg = createValidatorActionFormGroup();
  fg.patchValue(action);
  return fg;
}

export type UiActionForm = FormGroup<{
  type: FormControl<'ui'>;
  formItemId: FormControl<string | null>;
  action: FormControl<'show' | 'hide' | 'enable' | 'disable' | 'fill' | null>;
  value: FormControl<string | number | boolean | Date | string[] | null>;
}>;

type UiActionType = 'show' | 'hide' | 'enable' | 'disable' | 'fill';

export function createUiActionFormGroup(action?: Action): UiActionForm {
  const formItemId =
    action && 'formItemId' in action ? (action as { formItemId?: string | null }).formItemId ?? null : null;
  const actionType: UiActionType | null =
    action && 'action' in action ? ((action as { action: UiActionType }).action ?? null) : null;
  const value =
    action && 'value' in action && actionType === 'fill'
      ? ((action as { value?: string | number | boolean | Date | string[] | null }).value ?? null)
      : null;

  const uiActionForm = new FormGroup({
    type: new FormControl<'ui'>('ui', { nonNullable: true }),
    formItemId: new FormControl<string | null>(formItemId, { validators: [Validators.required] }),
    action: new FormControl<'show' | 'hide' | 'enable' | 'disable' | 'fill' | null>(actionType, {
      validators: [Validators.required],
    }),
    value: new FormControl<string | number | boolean | Date | string[] | null>(value),
  });

  if (actionType !== 'fill') {
    uiActionForm.controls.value.disable({ emitEvent: false });
    uiActionForm.controls.value.setValue(null, { emitEvent: false });
  }

  return uiActionForm;
}

export type ValidatorActionForm = FormGroup<{
  type: FormControl<'validator'>;
  formItemId: FormControl<string | string[] | null>;
  validator: FormControl<Validator | null>;
}>;

export function createValidatorActionFormGroup(item?: FormItem): ValidatorActionForm {
  return new FormGroup({
    type: new FormControl<'validator'>('validator', { nonNullable: true }),
    formItemId: new FormControl<string | string[] | null>(item?.id ?? null),
    validator: new FormControl<Validator | null>(null),
  });
}
