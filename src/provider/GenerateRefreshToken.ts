import { client } from "../prisma/client"
import dayjs from 'dayjs'
require('dotenv').config()

class GenerateRefreshToken {

  async execute(userId: string){
    const expiresIn = dayjs().add(Number(process.env.REFRESH_TOKEN_TIME),process.env.REFRESH_TOKEN_UNIT).unix()

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })
    
    return generateRefreshToken;
  }
}

export {GenerateRefreshToken}