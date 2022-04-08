import {Request,Response} from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response){
    //pega apenas oq importa na request
    const {username, name, password} = request.body
    //envia ao banco apenas oq preciso
    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute({
      username,
      name, 
      password,
    });

    return response.status(201).json(user);
  }
}

export {CreateUserController}