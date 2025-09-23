import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateItemPreview } from './date-item-preview';

describe('DateItemPreview', () => {
  let component: DateItemPreview;
  let fixture: ComponentFixture<DateItemPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateItemPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(DateItemPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
