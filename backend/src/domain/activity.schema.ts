import mongoose from "mongoose";

import { Acitivity } from "../shared/interfaces";

const activitySchema = new mongoose.Schema<Acitivity>({
  activityName: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
})

export const ActivityEntity = mongoose.model<Acitivity>('Activities', activitySchema)