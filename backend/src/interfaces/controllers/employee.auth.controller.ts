import { NextFunction, Request, Response } from "express"
import { EmployeeUseCase } from "../../application/useCases/employee.useCase"

export class EmployeeAuthController {
  private employeeUseCase: EmployeeUseCase
  constructor() {
    this.employeeUseCase = new EmployeeUseCase()
  }

  employeeLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body 

      // Check if the user exists in the database using the email
      const isEmployee = await this.employeeUseCase.employeeExisting(email.toLowerCase())
      console.log(isEmployee, 16)
      
    } catch (error) {

    }
  }
}