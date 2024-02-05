import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../task.service';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInput,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  taskForm!: FormGroup;
  durationInSeconds!: number;
  isLoading = false;
  taskNameToolTipInstructions = `- Required: This field must not be empty.
  - Valid Characters: Only letters (A-Z, a-z), apostrophes ('), spaces, and hyphens (-) are allowed.`;
  pointToolTipInstructions = `Please enter a two-digit number.`;
  subscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[A-Za-z' -]+$")]],
      points: ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
    });
  }

  nameValid(): string {
    const taskFormEmail = this.taskForm.get('name');
    if (
      taskFormEmail?.invalid &&
      (taskFormEmail?.dirty || taskFormEmail?.touched)
    ) {
      if (taskFormEmail?.errors?.['required']) return 'empty';
      if (taskFormEmail?.errors?.['pattern']) return 'format';
    }

    return '';
  }

  pointsValid(): string {
    const taskFormEmail = this.taskForm.get('points');
    if (
      taskFormEmail?.invalid &&
      (taskFormEmail?.dirty || taskFormEmail?.touched)
    ) {
      if (taskFormEmail?.errors?.['required']) return 'empty';
      if (taskFormEmail?.errors?.['pattern']) return 'format';
    }

    return '';
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isLoading = true;

      const { name, points } = this.taskForm.value;

      this.subscription = this.taskService.addTask(name, points).subscribe({
        next: (res) => {
          if (res.activityExists) this.openSnackBar('Activity already exists');
          else {
            this.openSnackBar('Activity added');
            this.taskForm.reset()
          }
        },
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(FailSnack, {
      data: { message },
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnDestroy() {
   if (this.subscription) this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'activity-snack',
  templateUrl: 'res-snack.html',
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
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
})
export class FailSnack {
  snackBarRef = inject(MatSnackBarRef);
  message

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message
  }

  close() {
    this.snackBarRef.dismissWithAction();
  }
}
