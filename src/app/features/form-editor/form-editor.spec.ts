import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditor } from './form-editor';

describe('FormEditor', () => {
  let component: FormEditor;
  let fixture: ComponentFixture<FormEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
