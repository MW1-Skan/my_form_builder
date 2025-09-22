import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Form } from '../../../models/form.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsService } from '../../../services/forms-service';

@Component({
  selector: 'app-form-card',
  imports: [ButtonModule, CardModule, DatePipe],
  templateUrl: './form-card.html',
  styleUrl: './form-card.scss',
})
export class FormCard {
  private readonly router = inject(Router);
  private readonly formsService = inject(FormsService);

  form = input.required<Form>();

  editForm() {
    this.router.navigate(['/editor', this.form().id]);
  }

  previewForm() {
    this.router.navigate(['/preview', this.form().id]);
  }

  deleteForm() {
    this.formsService.deleteForm(this.form().id);
  }
}
