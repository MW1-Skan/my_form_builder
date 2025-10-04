import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionValueEditor } from './condition-value-editor';

describe('ConditionValueEditor', () => {
  let component: ConditionValueEditor;
  let fixture: ComponentFixture<ConditionValueEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionValueEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionValueEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
