import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strictEmailValidator } from './validators'; // Importiere den Validator

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact-responsive.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  showConfirmation: boolean = false; // Zustand des Popups

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, strictEmailValidator]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Nachricht anzeigen
      this.showConfirmation = true;

      // Nach 3 Sekunden das Popup ausblenden
      setTimeout(() => {
        this.showConfirmation = false;
      }, 3000);

      // Formular zurücksetzen
      this.contactForm.reset();
    }
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
  get consent() { return this.contactForm.get('consent'); }
}
