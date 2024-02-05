import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../auth/auth.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router, RouterLink } from '@angular/router'
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-add',
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
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  isLogging = false
  durationInSeconds!: number
  registerForm!: FormGroup;
  emailToolTipInstructions = `
  - The email field is required, meaning you must provide an email address.
  - Ensure the email follows the standard format: username@domain.com.
  - The username can contain letters, numbers, and periods (.), hyphens (-), or underscores (_) in between.
  - The domain must have at least one period (.) and can have two or three characters after the last period.
  - Example: john.doe@example.com
  
  Note: This field is case-sensitive, so make sure to enter the email address accurately.
  `
  nameToolTipInstructions = `- Required: This field must not be empty.
  - Valid Characters: Only letters (A-Z, a-z), apostrophes ('), spaces, and hyphens (-) are allowed.`
  subscription!: Subscription

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService,
    ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      name: ['', [Validators.required, Validators.pattern("^[A-Za-z' -]+$")]],
    });
  }

  emailValid(): string {
    const registerFormEmail = this.registerForm.get('email');
    if (
      registerFormEmail?.invalid &&
      (registerFormEmail?.dirty || registerFormEmail?.touched)
    ) {
      if (registerFormEmail?.errors?.['required']) return 'empty';
      if (registerFormEmail?.errors?.['pattern']) return 'format'
    }

    return ''
  }

  nameValid(): string {
    const registerFormEmail = this.registerForm.get('name');
    if (
      registerFormEmail?.invalid &&
      (registerFormEmail?.dirty || registerFormEmail?.touched)
    ) {
      if (registerFormEmail?.errors?.['required']) return 'empty';
      if (registerFormEmail?.errors?.['pattern']) return 'format'
    }

    return ''
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLogging = true;

      const { email, name } = this.registerForm.value

      this.subscription = this.authService.register(email, name).subscribe({
        next: res => {
          if (res.success) this.openSnackBar()
        }
      })
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'success-snack',
  templateUrl: 'success-snack.html',
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
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(private router: Router) {}

  close() {
    this.snackBarRef.dismissWithAction()
    this.router.navigateByUrl('/auth')
  }
}
