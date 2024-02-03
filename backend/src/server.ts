import express from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

import { ServerApp } from './serverApp'

const app = express()
const serverApp = new ServerApp(app)

serverApp.startServer()

export default serverApp