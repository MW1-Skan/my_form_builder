import { Component, input } from '@angular/core';

@Component({
  selector: 'app-separator-preview',
  imports: [],
  templateUrl: './separator-preview.html',
  styleUrl: './separator-preview.scss',
})
export class SeparatorPreview {
  title = input<string>();

  description = input<string>();
}
