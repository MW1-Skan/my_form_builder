import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextItemPreview } from './text-item-preview';

describe('TextItemPreview', () => {
  let component: TextItemPreview;
  let fixture: ComponentFixture<TextItemPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextItemPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(TextItemPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
