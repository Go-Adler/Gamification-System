import { Component, inject } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router'
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';


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
  durationInSeconds!: number
  emailToolTipInstructions = `
  - The email field is required, meaning you must provide an email address.
  - Ensure the email follows the standard format: username@domain.com.
  - The username can contain letters, numbers, and periods (.), hyphens (-), or underscores (_) in between.
  - The domain must have at least one period (.) and can have two or three characters after the last period.
  - Example: john.doe@example.com
  
  Note: This field is case-sensitive, so make sure to enter the email address accurately.
  `

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    console.log(86);
    if (this.logInForm.valid) {
      this.isLogging = true;

      const { email } = this.logInForm.value

      this.authService.punchIn(email).subscribe({
        next: res => {
          if (res.notExisting) this.openSnackBar()
          this.router.navigateByUrl('/home')
        }
      })
    }
  }
  
  openSnackBar() {
    this._snackBar.openFromComponent(FailSnack, {
      duration: this.durationInSeconds * 1000,
    });
  }
}


@Component({
  selector: 'fail-snack',
  templateUrl: 'fail-snack.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class FailSnack{
  snackBarRef = inject(MatSnackBarRef);

  constructor() {}

  close() {
    this.snackBarRef.dismissWithAction()
  }
}

