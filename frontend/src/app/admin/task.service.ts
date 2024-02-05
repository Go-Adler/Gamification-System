import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { ConfigService } from '../services/config.service'
import { AddActivityResponse, DetailsResponse, EditActivityResponse, FetchActivitiesResponse, FinishResponse, RankingResponse } from '../shared/interfaces'

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

  editActivity(activityName: string, points: string, _id: string) {
    return this.http.post<EditActivityResponse>(`${this.API_URL}admin/activity/edit`, { activityName, points, _id })
  }

  finishTask(_id: string) {
    return this.http.post<FinishResponse>(`${this.API_URL}employee/task/finish`, { _id })
  }

  getRanking(month: number, year: number) {
    return this.http.post<RankingResponse>(`${this.API_URL}employee/ranking`, { month, year })
  }

  getEmployeeInfo(id: string) {
    return this.http.post<DetailsResponse>(`${this.API_URL}employee/details`, { id })
  }
}
