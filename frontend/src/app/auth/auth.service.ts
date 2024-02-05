import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service'
import { LogInResponse, Success } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL
  userEmail: string = ''
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.API_URL = this.configService.getAPI_BaseURL();
  }

  addEmail(email: string) {
    this.userEmail = email
  }

  removeEmail() { 
    this.userEmail = ''
  }

  punchIn(email: string) {
    return this.http.post<LogInResponse>(`${this.API_URL}employee/punch-in`, { email })
  }

  register(email: string, name: string) {
    return this.http.post<Success>(`${this.API_URL}employee/add`, { email, name })
  }
}
