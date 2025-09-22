import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatorPreview } from './separator-preview';

describe('SeparatorPreview', () => {
  let component: SeparatorPreview;
  let fixture: ComponentFixture<SeparatorPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparatorPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(SeparatorPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
