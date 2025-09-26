import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxItemEditor } from './checkbox-item-editor';

describe('CheckboxItemEditor', () => {
  let component: CheckboxItemEditor;
  let fixture: ComponentFixture<CheckboxItemEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxItemEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxItemEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
