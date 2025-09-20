import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElement } from './form-element';

describe('FormElement', () => {
  let component: FormElement;
  let fixture: ComponentFixture<FormElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElement],
    }).compileComponents();

    fixture = TestBed.createComponent(FormElement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
