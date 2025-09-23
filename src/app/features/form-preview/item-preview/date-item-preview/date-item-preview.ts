import { Component, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FormItem } from '../../../../models/form-item.model';
import { DateItemPreviewFormGroup } from '../../../../models/form-groups/preview/form-preview-form-group.model';
import { DateExtras } from '../../../../models/item-extras.model';

@Component({
  selector: 'app-date-item-preview',
  imports: [ReactiveFormsModule, DatePickerModule],
  templateUrl: './date-item-preview.html',
  styleUrl: './date-item-preview.scss',
})
export class DateItemPreview implements OnInit {
  itemPreviewForm = input.required<DateItemPreviewFormGroup>();

  item = input.required<FormItem>();

  extras = signal<DateExtras | null>(null);

  get placeholder(): string {
    return this.extras()?.placeholder ?? '';
  }

  get minDate(): Date | null {
    return this.extras()?.minDate ?? null;
  }

  readonly DEFAULT_MIN_DATE: Date = new Date(0, 0, 1); // January 1st, 0

  get maxDate(): Date | null {
    return this.extras()?.maxDate ?? null;
  }

  readonly DEFAULT_MAX_DATE: Date = new Date(10000, 0, 1); // January 1st, 10000

  get showIcon(): boolean {
    return this.extras()?.showIcon ?? false;
  }

  get isRange(): boolean {
    return this.extras()?.isRange ?? false;
  }

  get canType(): boolean {
    return this.extras()?.canType ?? false;
  }

  get showTime(): boolean {
    return this.extras()?.showTime ?? false;
  }

  ngOnInit(): void {
    const form = this.itemPreviewForm();
    const item = this.item();
    if (!form || !item) return;
    this.extras.set(item.extras as DateExtras);
  }

  hasMin(): boolean {
    return this.minDate != null;
  }
}
