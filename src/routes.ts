import {Router} from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/refreshTokenUserController';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.get("/terms-of-service", (req,res) => {
  return res
          .status(200)
          .json({
            message: "Terms os Service from API"
          })
})

/* This is registering a route for the `CreateUserController` to handle. */
router.post("/users", createUserController.handle)

/* This is registering a route for the `AuthenticateUserController` to handle. */
router.post("/login", authenticateUserController.handle)
router.post("/refresh-token", refreshTokenUserController.handle)

router.get("/token", ensureAuthenticated, (req,res) => {
  return res
          .status(200)
          .json([
            { message:"Ok"},
          ])
})

/* This is a route that will be called when the user goes to the root of the API. */
router.get("/", (req,res) => {
        res
          .status(200)
          .send({message:"Its alive"})
      })

export {router}