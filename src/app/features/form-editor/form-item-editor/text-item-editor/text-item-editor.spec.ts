import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextItemEditor } from './text-item-editor';

describe('TextItemEditor', () => {
  let component: TextItemEditor;
  let fixture: ComponentFixture<TextItemEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextItemEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(TextItemEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
