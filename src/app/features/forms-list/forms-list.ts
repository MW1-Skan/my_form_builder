import { Component, inject, Signal } from '@angular/core';
import { FormCard } from './form-card/form-card';
import { FormsService } from '../../services/forms-service';
import { Router } from '@angular/router';
import { Form } from '../../models/form.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forms-list',
  imports: [FormCard, ButtonModule],
  templateUrl: './forms-list.html',
  styleUrl: './forms-list.scss',
})
export class FormsList {
  private readonly formsService = inject(FormsService);
  private readonly router = inject(Router);

  get forms(): Signal<Form[]> {
    return this.formsService.forms;
  }

  createForm() {
    this.router.navigate(['/editor']);
  }
}
