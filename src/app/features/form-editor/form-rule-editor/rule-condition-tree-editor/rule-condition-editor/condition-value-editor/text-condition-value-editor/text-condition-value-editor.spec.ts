import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextConditionValueEditor } from './text-condition-value-editor';

describe('TextConditionValueEditor', () => {
  let component: TextConditionValueEditor;
  let fixture: ComponentFixture<TextConditionValueEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextConditionValueEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextConditionValueEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
