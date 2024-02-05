import { NextFunction, Request, Response } from "express"
import { EmployeeUseCase } from "../../application/useCases/employee.useCase"
import { TokenUseCase } from "../../application/useCases/employee.token.useCase"
import { AdminUseCase } from "../../application/useCases/admin.useCase"
import { JwtPayload } from "jsonwebtoken"


export class EmployeeAuthController {
  private employeeUseCase: EmployeeUseCase
  private tokenUseCase: TokenUseCase
  private adminUseCase: AdminUseCase

  
  constructor() {
    this.employeeUseCase = new EmployeeUseCase()
    this.tokenUseCase = new TokenUseCase()
    this.adminUseCase = new AdminUseCase()
  }

  employeeLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body 

      // Check if the user exists in the database using the email
      const isEmployee = await this.employeeUseCase.employeeExisting(email.toLowerCase())
      if (!isEmployee) return res.json({ notExisting: true })
      
      const token = this.tokenUseCase.generateTokenWithUserId(isEmployee)

      res.json({ message: 'Loging success', token })
      
    } catch (error) {
      return next(error)
    }
  }

  employeeAdd= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body 

      // Check if the user exists in the database using the email
      const isEmployeeExists = await this.employeeUseCase.employeeExisting(email.toLowerCase())
      
      if (isEmployeeExists) return res.json({ employeeExists: true })

      await this.employeeUseCase.add(email, name)

      res.json({ message: 'Registration success', success: true })
      
    } catch (error) {
      return next(error)
    }
  }

  finishTask= async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { _id } = req.body 
      const { userId } = req.user as JwtPayload

       // Check if the activity exists in the database using the email
       const activityExists = await this.adminUseCase.activityExistsById(
        _id
      )
      
      if (!activityExists) return res.json({ taskNotExists: true })

      await this.employeeUseCase.addActivity(userId, _id)

      res.json({ message: 'Finish success', success: true })
      
    } catch (error) {
      return next(error)
    }
  }

  getRanking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { month, year } = req.body

       const ranking = await this.employeeUseCase.getRanking(month, year)
       res.json({ ranking })
      
    } catch (error) {
      return next(error)
    }
  }

  getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body
       const { employee, activities } = await this.employeeUseCase.details(id)
       res.json({ employee, activities })
      
    } catch (error) {
      return next(error)
    }
  }
}