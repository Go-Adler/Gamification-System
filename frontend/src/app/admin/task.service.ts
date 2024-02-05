import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { ConfigService } from '../services/config.service'
import { AddActivityResponse, FetchActivitiesResponse } from '../shared/interfaces'

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
    return this.http.post<AddActivityResponse>(`${this.API_URL}admin/activity/add`, { activityName, points })
  }

  getAllTasks() {
    return this.http.get<FetchActivitiesResponse>(`${this.API_URL}admin/activities`)
  }
}
