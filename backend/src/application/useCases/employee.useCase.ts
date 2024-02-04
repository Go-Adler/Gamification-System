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

}