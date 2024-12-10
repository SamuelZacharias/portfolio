import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strictEmailValidator } from './validators';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact-responsive.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  showConfirmation: boolean = false;
  mailTest = true;
  http = inject(HttpClient)

  post = {
    endPoint: 'https://samuelzacharias.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email, strictEmailValidator, Validators.maxLength(40)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      consent: [false, Validators.requiredTrue],
    });
  }
  
  

  onSubmit(): void {
    if (this.contactForm.valid) {
      // HTTP-Post-Anfrage senden mit contactForm.value
      this.http.post<any>(this.post.endPoint, this.post.body(this.contactForm.value))
        .subscribe({
          next: (response: any) => {
            console.info('HTTP-Post erfolgreich:', response);
  
            // Bestätigungsmeldung anzeigen
            this.showConfirmation = true;
  
            // Nach 3 Sekunden die Bestätigungsmeldung ausblenden
            setTimeout(() => {
              this.showConfirmation = false;
            }, 3000);
  
            // Formular zurücksetzen
            this.contactForm.reset();
          },
          error: (error: any) => {
            console.error('Fehler beim Senden der HTTP-Post-Anfrage:', error);
          },
          complete: () => console.info('HTTP-Post abgeschlossen'),
        });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
  get consent() { return this.contactForm.get('consent'); }
}
