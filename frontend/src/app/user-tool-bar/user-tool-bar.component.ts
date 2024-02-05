import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { Router, RouterLink } from '@angular/router'
import { BrowserInteractionsService } from '../services/browser-interactions.service'

@Component({
  selector: 'app-user-tool-bar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './user-tool-bar.component.html',
  styleUrl: './user-tool-bar.component.scss'
})
export class UserToolBarComponent {
  constructor(
    private browserInteractionsService: BrowserInteractionsService,
    private router: Router
  ) {}
  logOut() {
    this.browserInteractionsService.clearLocalStorageItem()
    this.router.navigateByUrl('/punch-in')
  }
}
