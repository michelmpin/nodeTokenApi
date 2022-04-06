import { sign } from 'jsonwebtoken';
require('dotenv').config();

class GenerateTokenProvider{
  async execute(userId:string){
    const token = sign({},process.env.TOKEN_PASS, {
      subject: userId,
      expiresIn: process.env.TOKEN_TIME
    })

    return token
  }
}

export {GenerateTokenProvider}