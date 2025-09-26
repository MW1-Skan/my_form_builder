import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioItemPreview } from './radio-item-preview';

describe('RadioItemPreview', () => {
  let component: RadioItemPreview;
  let fixture: ComponentFixture<RadioItemPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioItemPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioItemPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
