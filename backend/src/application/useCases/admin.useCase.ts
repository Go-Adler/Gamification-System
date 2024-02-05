import { ActivityDataAccess } from "../../data/activity.dataAccess"
import { ErrorHandling } from "../../utils/errorHandling"

export class AdminUseCase {
  private activityDataAccess: ActivityDataAccess

  constructor() {
    this.activityDataAccess = new ActivityDataAccess()
  }

  async activityExists(name: string) {
    try {
      return await this.activityDataAccess.activityExists(name.toLowerCase())
    } catch (error) {
        ErrorHandling.processError("Error in activityExists, AdminUseCase", error)
    }
  }

  async activityExistsById(_id: string) {
    try {
      return await this.activityDataAccess.activityExistsById(_id)
    } catch (error) {
        ErrorHandling.processError("Error in activityExistsById, AdminUseCase", error)
    }
  }

  async add(name: string, points: number) {
    try {
      return await this.activityDataAccess.createActivity(name, points)
    } catch (error) {
        ErrorHandling.processError("Error in activityExisting, AdminUseCase", error)
    }
  }

  async edit(id: string, name: string, points: number) {
    try {
      return await this.activityDataAccess.editActivity(id, name, points)
    } catch (error) {
        ErrorHandling.processError("Error in edit, AdminUseCase", error)
    }
  }

  async getAllActivities() {
    try {
      return await this.activityDataAccess.getAllActivities()
    } catch (error) {
        ErrorHandling.processError("Error in getAllActivities, AdminUseCase", error)
    }
  }
}