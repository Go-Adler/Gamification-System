import { Component } from '@angular/core';
import { UserToolBarComponent } from '../user-tool-bar/user-tool-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router'
import { CapitalizePipe } from '../shared/firstUpper.pipe'
import { MatCardModule } from '@angular/material/card'
import { TaskService } from '../admin/task.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FailSnack } from '../admin/task/new/new.component'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [UserToolBarComponent, MatButtonModule, CapitalizePipe, MatCardModule],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent {
  durationInSeconds!: number
  activityName;
  points;
  _id;
  subscription!: Subscription

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {
    this.activityName = this.route.snapshot.paramMap.get('activityName')!;
    this.points = this.route.snapshot.paramMap.get('points')!;
    this._id = this.route.snapshot.paramMap.get('_id')!;
  }

  finish() {
    this.subscription = this.taskService.finishTask(this._id).subscribe({
      next: res => {
        if (res.taskNotExists) this.openSnackBar('Task not exists')
        else {
          this.openSnackBar('Task finished')
          this.router.navigateByUrl('/home')
        }
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(FailSnack, {
      data: { message },
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
