import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { ConfigService } from '../services/config.service'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API_URL

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.API_URL = this.configService.getAPI_BaseURL();
  }

  addTask(activityName: string, points: number) {
    return this.http.post(`${this.API_URL}employee/activity/add`, { activityName, points })
  }
}
