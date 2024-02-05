import express from 'express'
import { ActivityController } from '../controllers/admin.activity.controller'

const { addActivity, getActivities, editActivity } = new ActivityController()

const router = express.Router()


router.get("/activities", getActivities)

router.post("/activity/edit", editActivity)
router.post("/activity/add", addActivity)


export { router as adminRoutes }