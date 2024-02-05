import { Types, Document } from "mongoose"

export interface Employee extends Document {
  email: string,
  name: string,
  activities: Types.ObjectId[]
}

export interface Acitivity extends Document {
  activityName: string,
  points: number,
}