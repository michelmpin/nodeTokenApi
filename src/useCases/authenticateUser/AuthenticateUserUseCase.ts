import {compare} from 'bcryptjs'
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

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
      throw erroUsuarioSenha();
    }

    //Verificar se a senha está correta
    const passMatch = compare(password,userAlreadyExists.password);

    if(!passMatch){
      throw erroUsuarioSenha();
    }

    //gerar token do usuario
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id)

    await client.refreshToken.deleteMany({
      where:{
        userId: userAlreadyExists.id
      }
    })
    
    const generatedRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generatedRefreshToken.execute(userAlreadyExists.id)
    
    return {token, refreshToken}
  }
  
}

export {AuthenticateUserUseCase}