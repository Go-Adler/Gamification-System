import mongoose from "mongoose"
import { Types, Document } from "mongoose"

export interface Employee extends Document {
  email: string,
  name: string,
  activities: Types.ObjectId[]
}

export interface Activity extends Document {
  activityName: string,
  points: number,
}

export interface ActivityFinished extends Document {
  activityName: string,
  activityId: Types.ObjectId,
  points: number,
  employeeId: Types.ObjectId,
  date: Date,
}


export interface UserRanking {
  _id: mongoose.Types.ObjectId;
  totalPoints: number;
}