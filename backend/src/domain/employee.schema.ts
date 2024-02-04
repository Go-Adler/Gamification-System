import mongoose from "mongoose";

import { Employee } from "../shared/interfaces";

const employeeSchema = new mongoose.Schema<Employee>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  activities: {
    type: [mongoose.Types.ObjectId],
    default: []
  }
})

export const EmployeeEntity = mongoose.model<Employee>('Employees', employeeSchema)