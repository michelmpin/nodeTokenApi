import {Router} from 'express'
import { CreateUserController } from './useCases/createUser/CreeateUserController';

const router = Router();

const createUserController = new CreateUserController();

/* This is registering a route for the `CreateUserController` to handle. */
router.post("/users", createUserController.handle)

/* This is a route that will be called when the user goes to the root of the API. */
router.get("/", (req,res) => {
        res
          .status(200)
          .send({response:"Its alive"})
      })

export {router}