import { EmployeeDataAccess } from "../../data/employee.dataAccess"
import { ErrorHandling } from "../../utils/errorHandling"

export class EmployeeUseCase {
  private employeeDataAccess: EmployeeDataAccess

  constructor() {
    this.employeeDataAccess = new EmployeeDataAccess()
  }

  async employeeExisting(email: string) {
    try {
      return await this.employeeDataAccess.employeeExists(email)
    } catch (error) {
        ErrorHandling.processError("Error in employeeExisting, EmployeeUseCase", error)
    }
  }

  async add(email: string, name: string) {
    try {
      return await this.employeeDataAccess.createUser(email, name)
    } catch (error) {
        ErrorHandling.processError("Error in add, EmployeeUseCase", error)
    }
  }

  async addActivity(employeeId: string, activityId: string) {
    try {
      return await this.employeeDataAccess.createActivity(employeeId, activityId)
    } catch (error) {
      ErrorHandling.processError("Error in addActivity, EmployeeUseCase", error)
    }
  }
}