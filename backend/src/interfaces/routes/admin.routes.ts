import express from 'express'
import { ActivityController } from '../controllers/admin.activity.controller'

const { addActivity } = new ActivityController()

const router = express.Router()



router.post("/activity/add", addActivity)


export { router as adminRoutes }