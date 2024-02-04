import { NextFunction, Request, Response } from "express"
import { EmployeeUseCase } from "../../application/useCases/employee.useCase"
import { TokenUseCase } from "../../application/useCases/employee.token.useCase"

export class EmployeeAuthController {
  private employeeUseCase: EmployeeUseCase
  private tokenUseCase: TokenUseCase
  
  constructor() {
    this.employeeUseCase = new EmployeeUseCase()
    this.tokenUseCase = new TokenUseCase()
  }

  employeeLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body 

      // Check if the user exists in the database using the email
      const isEmployee = await this.employeeUseCase.employeeExisting(email.toLowerCase())
      if (!isEmployee) res.json({ notExisting: true })
      
      const token = this.tokenUseCase.generateTokenWithUserId(email)
      
      console.log(token, 23);
      res.json({ message: 'Loging success', token })
      
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