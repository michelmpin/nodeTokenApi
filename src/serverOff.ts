import "express-async-errors"
import express from 'express'
import { router } from './routes';

const app = express();

//informa sobre o uso de json nas requisições
app.use(express.json());

//inclui o arquivo de rotas
app.use(router);

//tratamento dos erros lançados pelas funções 
app.use((error, request, response, next) => {
  return response.status(Number(error.stack)).json({
    status: "Error",
    message: error.message,
  })
})

export {app}