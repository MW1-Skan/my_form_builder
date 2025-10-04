import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberConditionValueEditor } from './number-condition-value-editor';

describe('NumberConditionValueEditor', () => {
  let component: NumberConditionValueEditor;
  let fixture: ComponentFixture<NumberConditionValueEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberConditionValueEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberConditionValueEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
