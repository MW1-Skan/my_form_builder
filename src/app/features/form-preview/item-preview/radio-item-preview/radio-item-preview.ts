import { Component, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RadioItemPreviewFormGroup } from '../../../../models/form-groups/preview/form-preview-form-group.model';
import { FormItem, FormItemOption } from '../../../../models/form-item.model';
import { RadioExtras } from '../../../../models/item-extras.model';

@Component({
  selector: 'app-radio-item-preview',
  imports: [ReactiveFormsModule, RadioButtonModule],
  templateUrl: './radio-item-preview.html',
  styleUrl: './radio-item-preview.scss',
})
export class RadioItemPreview implements OnInit {
  itemPreviewForm = input.required<RadioItemPreviewFormGroup>();

  item = input.required<FormItem>();

  extras = signal<RadioExtras | null>(null);

  get options(): FormItemOption[] {
    return this.item().options ?? [];
  }

  ngOnInit(): void {
    const form = this.itemPreviewForm();
    const item = this.item();
    if (!form || !item) return;
    this.extras.set(item.extras as RadioExtras);
  }
}
