import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioItemEditor } from './radio-item-editor';

describe('RadioItemEditor', () => {
  let component: RadioItemEditor;
  let fixture: ComponentFixture<RadioItemEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioItemEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioItemEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
