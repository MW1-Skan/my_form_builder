import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberItemPreview } from './number-item-preview';

describe('NumberItemPreview', () => {
  let component: NumberItemPreview;
  let fixture: ComponentFixture<NumberItemPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberItemPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberItemPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
