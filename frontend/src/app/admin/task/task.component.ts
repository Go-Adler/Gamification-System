import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

}
