import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxItemPreview } from './checkbox-item-preview';

describe('CheckboxItemPreview', () => {
  let component: CheckboxItemPreview;
  let fixture: ComponentFixture<CheckboxItemPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxItemPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxItemPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
