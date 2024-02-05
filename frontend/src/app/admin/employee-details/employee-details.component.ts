import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TaskService } from '../task.service'
import { Activity, ActivityTotal, Employee } from '../../shared/interfaces'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { CapitalizePipe } from '../../shared/firstUpper.pipe'

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, CapitalizePipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent {
  _id: string;
  employee!: Employee
  activities!: Activity[]
  activityTotals: any = {}

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {
    this._id = this.route.snapshot.paramMap.get('id')!;
  }
  
  ngOnInit() {
    this.taskService.getEmployeeInfo(this._id).subscribe({
      next: res => {
        this.employee = res.employee
        this.activities = res.activities
        this.getActivityTotals()
      }
    })
  }

  getActivityTotals() {
    this.activities.forEach(entry => {
      const activityName = entry.activityName;
      const points = entry.points;

      if (!this.activityTotals[activityName]) {
        this.activityTotals[activityName] = points;
      } else {
        this.activityTotals[activityName] += points;
      }
    });
  }
}
