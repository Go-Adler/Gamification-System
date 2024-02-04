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
      res.json({ isEmployee })
      
    } catch (error) {

    }
  }

  employeeAdd= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body 

      // Check if the user exists in the database using the email
      const isEmployeeExists = await this.employeeUseCase.employeeExisting(email.toLowerCase())
      
      if (isEmployeeExists) res.json({ employeeExists: true })

      await this.employeeUseCase.add(email, name)

      res.json({ message: 'Registration success', success: true })
      

      
    } catch (error) {

    }
  }
}