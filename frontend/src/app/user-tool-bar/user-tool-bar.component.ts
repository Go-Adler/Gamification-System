import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { Router, RouterLink } from '@angular/router'
import { BrowserInteractionsService } from '../services/browser-interactions.service'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-user-tool-bar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './user-tool-bar.component.html',
  styleUrl: './user-tool-bar.component.scss'
})
export class UserToolBarComponent {
  email!: string
  constructor(
    private browserInteractionsService: BrowserInteractionsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.email = this.authService.userEmail
  }
  
  logOut() {
    this.browserInteractionsService.clearLocalStorageItem()
    this.authService.removeEmail()
    this.router.navigateByUrl('/punch-in')
  }
  
}
