import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorMessage } from './validation-error-message';

describe('ValidationErrorMessage', () => {
  let component: ValidationErrorMessage;
  let fixture: ComponentFixture<ValidationErrorMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationErrorMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationErrorMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
