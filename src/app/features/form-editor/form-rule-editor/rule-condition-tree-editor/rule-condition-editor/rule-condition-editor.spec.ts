import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConditionEditor } from './rule-condition-editor';

describe('RuleConditionEditor', () => {
  let component: RuleConditionEditor;
  let fixture: ComponentFixture<RuleConditionEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleConditionEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(RuleConditionEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
