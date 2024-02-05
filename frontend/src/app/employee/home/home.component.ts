import { Component } from '@angular/core';
import { UserToolBarComponent } from '../../user-tool-bar/user-tool-bar.component';
import { Activity } from '../../shared/interfaces';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CapitalizePipe } from '../../shared/firstUpper.pipe';
import { MatButtonModule } from '@angular/material/button'
import { TaskService } from '../../admin/task.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserToolBarComponent,
    MatProgressSpinnerModule,
    RouterLink,
    MatCardModule,
    CapitalizePipe,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  activities: Activity[] = [];
  subscription!: Subscription

  constructor(
    private router: Router,
    private taskService: TaskService,
    ) {}

  ngOnInit() {
    this.subscription = this.taskService.getAllTasks().subscribe({
      next: res => {
        this.activities = [...this.activities, ...res.activities]
      }
    })
  }

  navigateToEdit(activity: Activity) {
    this.router.navigate(['/finish', activity._id, activity]);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe()
  }
}
