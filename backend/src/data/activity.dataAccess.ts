import { ActivityEntity } from "../domain/activity.schema"
import { ErrorHandling } from "../utils/errorHandling"


export class ActivityDataAccess {
  /**
   * Check if an activity exists
   * @param name - The name to check
   * @returns True if the name exists, false otherwise
   */
  async activityExists(activityName: string) {
    try {
      const activity = await ActivityEntity.findOne({ activityName })
      
      return activity ? true : false
    } catch (error) {
      ErrorHandling.processError(
        "Error in activityExists, ActivityDataAccess",
        error
      )
    }
  }

  /**
   * Create a new activity
   * @param name - The name of the activity
   * @param points - The points for the activity
   * @returns The ID of the created activity
   */
  async createActivity(activityName: string, points: number) {
    try {
      // Create a new activity using the activityEntity model
      const activity = await ActivityEntity.create({
        activityName,
        points,
      })

      // Return the activity's ID
      return activity._id ? activity.id : ""
    } catch (error) {
      ErrorHandling.processError(
        "Error in createActivity, ActivityDataAccess",
        error
      )
    }
  }

  /**
   * Get all activities
   * @returns All activities
   */
  async getAllActivities() {
    try {
      // Get all activities
      return await ActivityEntity.find({})
    } catch (error) {
      ErrorHandling.processError(
        "Error in getAllActivities, ActivityDataAccess",
        error
      )
    }
  }
}
