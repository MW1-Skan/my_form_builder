import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementCompact } from './form-element-compact';

describe('FormElementCompact', () => {
  let component: FormElementCompact;
  let fixture: ComponentFixture<FormElementCompact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElementCompact],
    }).compileComponents();

    fixture = TestBed.createComponent(FormElementCompact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
