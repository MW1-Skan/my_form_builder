import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConditionsEditor } from './rule-conditions-editor';

describe('RuleConditionTreeEditor', () => {
  let component: RuleConditionsEditor;
  let fixture: ComponentFixture<RuleConditionsEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleConditionsEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(RuleConditionsEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
