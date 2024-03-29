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

export interface EditActivityResponse {
  message: string,
  notExists?: boolean,
  success?: boolean
}

export interface FinishResponse {
  message: string,
  taskNotExists?: boolean,
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

export interface RankingResponse {
  ranking: Ranking[];
}

export interface Ranking {
  totalPoints: number;
  employeeId: string;
  name: string;
}

export interface DetailsResponse {
  employee: Employee;
  activities: Activity[];
}

export interface Activity {
  _id: string;
  activityName: string;
  points: number;
  activityId: string;
  employeeId: string;
  date: string;
  __v: number;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
  activities: string[];
  __v: number;
}

export interface ActivityTotal {
  key: string;
  value: number;
}

export interface KeyValue {
  [key: string]: ActivityTotal;
}