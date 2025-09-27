import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemEditorCompact } from './form-item-editor-compact';

describe('FormItemEditorCompact', () => {
  let component: FormItemEditorCompact;
  let fixture: ComponentFixture<FormItemEditorCompact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormItemEditorCompact],
    }).compileComponents();

    fixture = TestBed.createComponent(FormItemEditorCompact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
