import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRuleEditor } from './form-rule-editor';

describe('FormRuleEditor', () => {
  let component: FormRuleEditor;
  let fixture: ComponentFixture<FormRuleEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRuleEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRuleEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
