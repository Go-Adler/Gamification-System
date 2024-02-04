import express from 'express'
import { EmployeeAuthController } from '../controllers/employee.auth.controller'

const { employeeLogin } = new EmployeeAuthController()

const router = express.Router()


router.post("/punch-in", employeeLogin)

export { router as employeeRoutes }