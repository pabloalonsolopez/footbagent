import { Router, Request, Response, NextFunction } from "express"
import { model } from "mongoose"

import { IUser } from "../models/user"

const UsersRouter: Router = Router()

const User = model("User")

UsersRouter.get("/", (request: Request, response: Response, next: NextFunction) => {
  User.find((err: any, users: IUser[]) => {
    if (err) return next(err)
    response.json(users)
  })
})

UsersRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
  User.create(request.body, (err: any, user: IUser) => {
    if (err) return next(err)
    response.json(user)
  })
})

UsersRouter.get("/:id", (request: Request, response: Response, next: NextFunction) => {
  User.findById(request.params.id, (err: any, user: IUser) => {
    if (err) return next(err)
    response.json(user)
  })
})

UsersRouter.put("/:id", (request: Request, response: Response, next: NextFunction) => {
  User.findById(request.params.id, (err: any, user: IUser) => {
    if (err) return next(err)
    request.body.forEach((property: any) => {
        user[property] = request.body[property]
    });
    user.save((err: any, user: IUser) => {
      if (err) return next(err)
      response.json(user)
    })
  })
})

UsersRouter.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
  User.findByIdAndRemove(request.params.id, (err: any, user: IUser) => {
    if (err) return next(err)
    response.json({})
  })
})

export { UsersRouter }