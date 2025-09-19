import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemEditor } from './form-item-editor';

describe('FormItemEditor', () => {
  let component: FormItemEditor;
  let fixture: ComponentFixture<FormItemEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormItemEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(FormItemEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
