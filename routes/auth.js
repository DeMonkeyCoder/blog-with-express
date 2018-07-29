//STILL HAS A LOT OF WORK TO DO

import express from 'express'

import User from '../models'
import { createJWToken } from '../libs/auth'
import { paramCheck } from '../middlewares'

const router = express.Router()

/*
  ROUTES
*/

router.post('*', paramCheck(['email', 'password']))

router.post('/login', (req, res) =>
{
  let { email, password } = req.body

  User.User.findByEmail(email)
  .then((user) => (!user) ? Promise.reject("User not found.") : user)
  .then((user) => user.comparePassword(password))
  .then((user) => user.publicParse(user))
  .then((user) =>
  {
    res.status(200)
      .json({
        success: true,
        token: createJWToken({
            sessionData: user,
            maxAge: 3600
          })
      })
  })
  .catch((err) =>
  {
    res.status(401)
      .json({
        message: err || "Validation failed. Given email and password aren't matching."
      })
  })
})

export default router