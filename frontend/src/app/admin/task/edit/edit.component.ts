import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    private router: Router,
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
    const taskFormName = this.taskForm.get('name');
    if (
      taskFormName?.invalid &&
      (taskFormName?.dirty || taskFormName?.touched)
    ) {
      if (taskFormName?.errors?.['required']) return 'empty';
      if (taskFormName?.errors?.['pattern']) return 'format';
    }

    return '';
  }

  pointsValid(): string {
    const taskFormPoints = this.taskForm.get('points');
    if (
      taskFormPoints?.invalid &&
      (taskFormPoints?.dirty || taskFormPoints?.touched)
    ) {
      if (taskFormPoints?.errors?.['required']) return 'empty';
      if (taskFormPoints?.errors?.['pattern']) return 'format';
    }

    return '';
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isLoading = true;

      const { name, points } = this.taskForm.value;

      this.taskService.editActivity(name, points, this._id).subscribe({
        next: (res) => {
          if (res.notExists) this.openSnackBar('Activity not exists');
          else {
            this.openSnackBar('Activity edit success');
            this.router.navigateByUrl('/admin/task')
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

  buttonValid():boolean {
    const taskFormPoints = this.taskForm.get('points');
    const taskFormName = this.taskForm.get('name');

    
    if (this.taskForm.valid && (taskFormName?.dirty || taskFormPoints?.dirty) ) return false
    return true
  }

}
