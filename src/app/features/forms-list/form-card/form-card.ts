import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Form } from '../../../models/form.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsService } from '../../../services/forms-service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-form-card',
  imports: [ButtonModule, CardModule, DatePipe],
  templateUrl: './form-card.html',
  styleUrl: './form-card.scss',
})
export class FormCard {
  private readonly router = inject(Router);
  private readonly formsService = inject(FormsService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  form = input.required<Form>();

  editForm() {
    this.router.navigate(['/editor', this.form().id]);
  }

  previewForm() {
    this.router.navigate(['/preview', this.form().id]);
  }

  deleteForm() {
    const deletedForm = this.formsService.deleteForm(this.form().id);
    this.messageService.add({
      severity: 'success',
      summary: 'Form deleted',
      detail: `"${deletedForm.title}" has been removed.`,
    });
  }

  confirmDeleteForm() {
    this.confirmationService.confirm({
      message: `Delete "${this.form().title}"?`,
      header: 'Delete Form',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteForm(),
    });
  }
}
