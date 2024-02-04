import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.API_URL = this.configService.getAPI_BaseURL();
  }

  punchIn(email: string) {
    return this.http.post(`${this.API_URL}employee/punch-in`, { email })
  }
}
