import {compare} from 'bcryptjs'
import { client } from "../../prisma/client";

interface IRequest{
  username: string;
  password: string;
}

class AuthenticateUserUseCase {

  async execute({username, password} : IRequest){
    
    function erroUsuarioSenha() {
      let error = new Error("User or Password incorrect");
      error.stack = '401';
      return error;
    }

    //verifica se usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });

    if (!userAlreadyExists) {
      let error = erroUsuarioSenha();
      throw error
    }

    //Verificar se a senha está correta
    const passMatch = compare(password,userAlreadyExists.password);

    if(!passMatch){
      let error = erroUsuarioSenha();
      throw error
    }

    //gerar token do usuario
    
    
  }
  
}

export {AuthenticateUserUseCase}