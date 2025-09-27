import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeparatorEditorCompact } from './form-separator-editor-compact';

describe('FormSeparatorEditorCompact', () => {
  let component: FormSeparatorEditorCompact;
  let fixture: ComponentFixture<FormSeparatorEditorCompact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSeparatorEditorCompact],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSeparatorEditorCompact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
