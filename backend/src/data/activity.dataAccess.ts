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
   * Check if an activity exists by _id
   * @param id - The id to check
   * @returns True if the id exists, false otherwise
   */
    async activityExistsById(id: string) {
      try {
        const activity = await ActivityEntity.findById(id)
        console.log(activity, 32);
        
        return activity ? true : false
      } catch (error) {
        ErrorHandling.processError(
          "Error in activityExistsById, ActivityDataAccess",
          error
        )
      }
    }

  /**
   * Create a new activity
   * @param name - The name of the activity
   * @param points - The points for the activity
   */
  async createActivity(activityName: string, points: number) {
    try {
      // Create a new activity using the activityEntity model
      const activity = await ActivityEntity.create({
        activityName,
        points,
      })
    } catch (error) {
      ErrorHandling.processError(
        "Error in createActivity, ActivityDataAccess",
        error
      )
    }
  }

    /**
   * Edia an activity
   * @param id - The id of the activity
   * @param name - The name of the activity
   * @param points - The points for the activity
   */
    async editActivity(id: string, activityName: string, points: number) {
      try {
        // Update the activity using the activityEntity model
        await ActivityEntity.findByIdAndUpdate(id, { activityName, points })
      } catch (error) {
        ErrorHandling.processError(
          "Error in editActivity, ActivityDataAccess",
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
