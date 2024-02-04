export interface Success {
  message: string,
  success: boolean
}

export interface LogInResponse {
  message: string,
  notExisting?: boolean,
  success?: boolean
}