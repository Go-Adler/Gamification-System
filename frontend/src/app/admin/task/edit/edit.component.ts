import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FailSnack } from '../new/new.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTooltipModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  taskForm!: FormGroup;
  durationInSeconds!: number;
  isLoading = false;
  taskNameToolTipInstructions = `- Required: This field must not be empty.
  - Valid Characters: Only letters (A-Z, a-z), apostrophes ('), spaces, and hyphens (-) are allowed.`;
  pointToolTipInstructions = `Please enter a two-digit number.`;
  activityName: string;
  points: string;
  _id: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.activityName = this.route.snapshot.paramMap.get('activityName')!;
    this.points = this.route.snapshot.paramMap.get('points')!;
    this._id = this.route.snapshot.paramMap.get('_id')!;
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      name: [
        this.activityName,
        [Validators.required, Validators.pattern("^[A-Za-z' -]+$")],
      ],
      points: [
        this.points,
        [Validators.required, Validators.pattern('^[0-9]{2}$')],
      ],
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

      this.taskService.addTask(name, points).subscribe({
        next: (res) => {
          if (res.activityExists) this.openSnackBar('Activity already exists');
          else {
            this.openSnackBar('Activity added');
            this.taskForm.reset();
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
}
