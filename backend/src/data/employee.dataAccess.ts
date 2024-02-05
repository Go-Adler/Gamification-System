import { ErrorHandling } from "../utils/errorHandling"
import { EmployeeEntity } from "../domain/employee.schema"
import { ActivityFinishedEntity } from "../domain/activities.schema"
import { ActivityDataAccess } from "./activity.dataAccess"

export class EmployeeDataAccess {
  private activityDataAccess: ActivityDataAccess
  constructor(
  ) {
    this.activityDataAccess = new ActivityDataAccess()
  }
  
  /**
   * Check if a employee exists
   * @param email - The email to check
   * @returns True if the email exists, false otherwise
   */
  async employeeExists(email: string) {
    try {
      const employee = await EmployeeEntity.findOne({ email })
      return employee ? employee._id : false
    } catch (error) {
      ErrorHandling.processError(
        "Error in employeeExists, EmployeeDataAccess",
        error
      )
    }
  }

  /**
   * Create a new user
   * @param name - The name of the user
   * @param email - The email of the user
   * @returns The ID of the created user
   */
  async createUser(email: string, name: string) {
    try {
      // Create a new user using the UserEntity model
      const user = await EmployeeEntity.create({
        name,
        email,
      })

      // Return the user's ID
      return user._id ? user.id : ""
    } catch (error) {
      ErrorHandling.processError(
        "Error in createUser, employeeDataAccess",
        error
      )
    }
  }


  /**
   * Create a new user
   * @param employeeId - id of the employee
   * @param activityId - id of activity
   */
  async createActivity(employeeId: string, activityId: string) {
    try {
      let activityName!: string, points!: number

      const activity = await this.activityDataAccess.getActivity(activityId)
      if (activity) {
        activityName = activity.activityName
        points = activity.points
      }

      // Create a new activity
      await ActivityFinishedEntity.create({
        activityName,
        points,
        activityId,
        employeeId
      })
    } catch (error) {
      ErrorHandling.processError(
        "Error in createUser, employeeDataAccess",
        error
      )
    }
  }
}
