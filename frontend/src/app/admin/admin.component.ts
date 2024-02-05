import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { ToolbarComponent } from '../toolbar/toolbar.component'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, ToolbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
