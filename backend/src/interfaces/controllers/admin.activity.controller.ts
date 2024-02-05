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

  editActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activityName, points, _id } = req.body

      // Check if the user exists in the database using the email
      const activityExists = await this.adminUseCase.activityExistsById(
        _id
      )

      if (!activityExists) return res.json({ notExists: true })

      await this.adminUseCase.edit(_id, activityName, points)

      res.json({ message: "Activity edit", success: true })
    } catch (error) {
      return next(error)
    }
  }

  getActivities = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const activities = await this.adminUseCase.getAllActivities()
      res.json({ activities })
    } catch (error) {
      return next(error)
    }
  }
}
