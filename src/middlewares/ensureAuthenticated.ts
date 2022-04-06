import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
require('dotenv').config();


export function ensureAuthenticated(request:Request , response:Response, next:NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken){
    return response.status(401).json({
      message: "Token is missing"
    })
  }

  //Bearer
  const [, token] = authToken.split(" ");

  try {
    verify(token, process.env.TOKEN_PASS)  
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid"
    })
  }
  
}