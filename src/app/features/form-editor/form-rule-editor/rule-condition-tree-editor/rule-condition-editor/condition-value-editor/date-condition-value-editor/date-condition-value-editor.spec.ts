import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateConditionValueEditor } from './date-condition-value-editor';

describe('DateConditionValueEditor', () => {
  let component: DateConditionValueEditor;
  let fixture: ComponentFixture<DateConditionValueEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateConditionValueEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateConditionValueEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
