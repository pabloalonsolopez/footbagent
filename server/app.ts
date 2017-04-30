import * as express from "express"
import * as path from "path"
import * as logger from "morgan"
import * as favicon from "serve-favicon"
import * as bodyparser from "body-parser"
import * as mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config({ path: path.join(__dirname, "config", ".env") })

import "./models/user"

import { UsersRouter } from "./routes/users"
import { IndexRouter } from "./routes/index"

mongoose.connect(process.env.DATABASE_URL)

const app: express.Application = express()

app.disable("x-powered-by")

app.use(logger("dev"))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use("/api/users", UsersRouter)

if (app.get("env") === "production") {
  app.use(express.static(path.join(__dirname, "../client")))

  app.use(favicon(path.join(__dirname, "../client/assets/images/favicons", "favicon.ico")))
  
  app.use("*", IndexRouter)
}

if (app.get("env") === "development") {
  app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.status(error.status || 500)
    response.json({
      error: error,
      message: error.message
    })
  })
}

app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
  response.status(error.status || 500)
  response.json({
    error: {},
    message: error.message
  })
})

export { app }