import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';
import { AuthService } from './auth.service'
import { RouterLink } from '@angular/router'


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLogging = false
  logInForm!: FormGroup;
  emailToolTipInstructions = `
  - The email field is required, meaning you must provide an email address.
  - Ensure the email follows the standard format: username@domain.com.
  - The username can contain letters, numbers, and periods (.), hyphens (-), or underscores (_) in between.
  - The domain must have at least one period (.) and can have two or three characters after the last period.
  - Example: john.doe@example.com
  
  Note: This field is case-sensitive, so make sure to enter the email address accurately.
  `

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
    });
  }

  emailValid(): string {
    const logInFormEmail = this.logInForm.get('email');
    if (
      logInFormEmail?.invalid &&
      (logInFormEmail?.dirty || logInFormEmail?.touched)
    ) {
      if (logInFormEmail?.errors?.['required']) return 'empty';
      if (logInFormEmail?.errors?.['pattern']) return 'format'
    }

    return ''
  }

  onSubmit() {
    if (this.logInForm.valid) {
      this.isLogging = true;

      const { email } = this.logInForm.value

      this.authService.punchIn(email).subscribe({
        next: res => {
          console.log(res, 83);
        }
      })
    }
  }
}
