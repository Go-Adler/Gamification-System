import express from 'express'
import { EmployeeAuthController } from '../controllers/employee.auth.controller'
import { JwtMiddleware } from '../middlewares/auth.middleware'

const { employeeLogin, employeeAdd, finishTask, getRanking } = new EmployeeAuthController()

const router = express.Router()

const { verifyJwt } = new JwtMiddleware()


router.post("/ranking", getRanking)
router.post("/task/finish", verifyJwt, finishTask)
router.post("/punch-in", employeeLogin)
router.post("/add", employeeAdd)

export { router as employeeRoutes }