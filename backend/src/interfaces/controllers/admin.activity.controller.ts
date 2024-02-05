import { NextFunction, Request, Response } from "express"
import { AdminUseCase } from "../../application/useCases/admin.useCase"

export class ActivityController {
  private adminUseCase: AdminUseCase
  constructor() {
    this.adminUseCase = new AdminUseCase()
  }

  addActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activityName, points } = req.body

      // Check if the user exists in the database using the email
      const activityExists = await this.adminUseCase.activityExists(
        activityName.toLowerCase()
      )
      
      if (activityExists) return res.json({ activityExists: true })

      await this.adminUseCase.add(activityName.toLowerCase(), points)

      res.json({ message: "Activity added", success: true })
    } catch (error) {
      return next(error)
    }
  }

  // employeeAdd= async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { email, name } = req.body

  //     // Check if the user exists in the database using the email
  //     const isEmployeeExists = await this.employeeUseCase.employeeExisting(email.toLowerCase())

  //     if (isEmployeeExists) res.json({ employeeExists: true })

  //     await this.employeeUseCase.add(email, name)

  //     res.json({ message: 'Registration success', success: true })

  //   } catch (error) {

  //   }
  // }
}
