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

      await  EmployeeEntity.findByIdAndUpdate(employeeId, { $push: { activities: activityId }})
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

  /**
   * Get ranking
   */
  async getRanking(month: number, year: number) {
    try {
      const result = await ActivityFinishedEntity.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $month: "$date" }, month] },
                { $eq: [{ $year: "$date" }, year] },
              ],
            },
          },
        },
        {
          $group: {
            _id: "$employeeId",
            totalPoints: { $sum: "$points" },
          },
        },
        {
          $sort: { totalPoints: -1 },
        },
        {
          $lookup: {
            from: "employees",
            localField: "_id",
            foreignField: "_id",
            as: "employeeDetails",
          },
        },
        {
          $unwind: "$employeeDetails",
        },
        {
          $project: {
            _id: 0,
            employeeId: "$_id",
            name: "$employeeDetails.name",
            totalPoints: 1,
          },
        },
      ]);
  
      // result will contain an array of objects with _id (employeeId) and totalPoints
  
      return result
    } catch (error) {
      ErrorHandling.processError(
        "Error in createUser, employeeDataAccess",
        error
      )
    }
  }

  


}
