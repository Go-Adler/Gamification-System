export interface Success {
  message: string,
  success: boolean
}

export interface LogInResponse {
  message: string,
  notExisting?: boolean,
  success?: boolean
}

export interface AddActivityResponse {
  message: string,
  activityExists?: boolean,
  success?: boolean
}

export interface Activity {
  _id: string,
  activityName: string,
  points: number,
}

export interface FetchActivitiesResponse {
  activities: Activity[]
}