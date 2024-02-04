import { ErrorHandling } from "../utils/errorHandling"
import { EmployeeEntity } from "../domain/employee.schema"

export class EmployeeDataAccess {
  /**
   * Check if a employee exists
   * @param email - The email to check
   * @returns True if the email exists, false otherwise
   */
  async employeeExists(email: string) {
    try {
      const employee = await EmployeeEntity.findOne({ email })
      return employee ? true : false
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
}
