import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router'
import {MatCardModule} from '@angular/material/card'; 

import { TaskService } from '../task.service'
import { Activity } from '../../shared/interfaces'
import { CapitalizePipe } from '../../shared/firstUpper.pipe'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatCardModule, CapitalizePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  activities: Activity[] = []
  constructor(
    private taskService: TaskService,
    private router: Router
    ) {}
  
  ngOnInit() {
    this.taskService.getAllTasks().subscribe({
      next: res => {
        this.activities = [...this.activities, ...res.activities]
      }
    })
  }

  navigateToEdit(activity: Activity) {
    this.router.navigate(['/admin/task/edit/', activity._id, activity])
  }
}
