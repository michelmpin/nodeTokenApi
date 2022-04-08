import {hash} from 'bcryptjs'
import {client} from '../../prisma/client'

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

class CreateUserUseCase {
  
 async execute({name, username, password} :IUserRequest){
   //verificar se usuario existe
   const userAlreadyExists = await client.user.findFirst({
     where:{
       username
     }
   });

   if(userAlreadyExists){
     let error = new Error("User already Exists!");
     error.name = '409';
     throw error;
   }

   //Cadastra usuario
     //Criptografa senha
   const passwordHash = await hash(password, 8)
   
   const user = await client.user.create({
     data:{
       name,
       username,
       password: passwordHash,
     }
   });

   return user;
 }
}

export {CreateUserUseCase}