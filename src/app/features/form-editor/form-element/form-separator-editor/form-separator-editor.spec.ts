import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeparatorEditor } from './form-separator-editor';

describe('FormSeparatorEditor', () => {
  let component: FormSeparatorEditor;
  let fixture: ComponentFixture<FormSeparatorEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSeparatorEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSeparatorEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
