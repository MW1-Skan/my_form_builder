import { Component, input } from '@angular/core';
import { ItemPreviewFormGroup } from '../../../../models/form-groups/preview/form-preview-form-group.model';

@Component({
  selector: 'app-number-item-preview',
  imports: [],
  templateUrl: './number-item-preview.html',
  styleUrl: './number-item-preview.scss'
})
export class NumberItemPreview {
  itemPreviewForm = input.required<ItemPreviewFormGroup>();
}
