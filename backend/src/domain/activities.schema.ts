import mongoose, { Types } from "mongoose";

import { ActivityFinished } from "../shared/interfaces";

const activityFinishedSchema = new mongoose.Schema<ActivityFinished>({
  activityName: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

export const ActivityFinishedEntity = mongoose.model<ActivityFinished>('ActivitiesFinished', activityFinishedSchema)