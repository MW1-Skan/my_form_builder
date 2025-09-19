import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberItemEditor } from './number-item-editor';

describe('NumberItemEditor', () => {
  let component: NumberItemEditor;
  let fixture: ComponentFixture<NumberItemEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberItemEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberItemEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
