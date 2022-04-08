import dayjs from "dayjs"
import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"


class RefreshTokenUserUseCase {
  async execute(refresh_token: string){
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refreshToken){
      let error = new Error("Refresh token invalid")
      error.name = "401"
      throw error
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId)

    if(refreshTokenExpired){
      await client.refreshToken.deleteMany({
        where:{
          userId: refreshToken.userId
        }
      })
      const generatedRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generatedRefreshTokenProvider.execute(refreshToken.userId)

      return {token, newRefreshToken}
    }

    return {token}
  }
}

export {RefreshTokenUserUseCase}