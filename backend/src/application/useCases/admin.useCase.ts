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

  async add(name: string, points: number) {
    try {
      return await this.activityDataAccess.createActivity(name, points)
    } catch (error) {
        ErrorHandling.processError("Error in activityExisting, AdminUseCase", error)
    }
  }
}