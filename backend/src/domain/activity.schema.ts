import mongoose from "mongoose";

import { Activity } from "../shared/interfaces";

const activitySchema = new mongoose.Schema<Activity>({
  activityName: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
})

export const ActivityEntity = mongoose.model<Activity>('Activities', activitySchema)