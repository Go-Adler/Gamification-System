import express from 'express'
import { EmployeeAuthController } from '../controllers/employee.auth.controller'

const { employeeLogin, employeeAdd } = new EmployeeAuthController()

const router = express.Router()


router.post("/punch-in", employeeLogin)
router.post("/add", employeeAdd)

export { router as employeeRoutes }