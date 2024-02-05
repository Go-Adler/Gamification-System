import { Component } from '@angular/core';
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
import { TaskService } from '../../task.service'

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
  taskNameToolTipInstructions = `- Required: This field must not be empty.
  - Valid Characters: Only letters (A-Z, a-z), apostrophes ('), spaces, and hyphens (-) are allowed.`;
  pointToolTipInstructions = `Please enter a two-digit number.`

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
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

    }
  }
}
