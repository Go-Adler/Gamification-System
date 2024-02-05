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