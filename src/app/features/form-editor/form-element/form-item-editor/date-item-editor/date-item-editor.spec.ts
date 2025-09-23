import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateItemEditor } from './date-item-editor';

describe('DateItemEditor', () => {
  let component: DateItemEditor;
  let fixture: ComponentFixture<DateItemEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateItemEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(DateItemEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
