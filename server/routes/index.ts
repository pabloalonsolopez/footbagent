import * as path from "path"
import { Router, Request, Response, NextFunction } from "express"

const IndexRouter: Router = Router()

IndexRouter.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.sendFile(path.join(__dirname, "../../client", "index.html"))
})

export { IndexRouter }