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
        ErrorHandling.processError("Error in employeeExists, EmployeeDataAccess", error)
      }
    }
}