import "express-async-errors"
import express from 'express'
import ejs from 'ejs'
import bodyParser from 'body-parser'
import { router } from './routes';

const app = express();

app.use(bodyParser.json());

//segurança para aplicação em questões de vulnerabilidade
//toda requisição feita enviará uma resposta fake sobre o sistema
app.use((req, res, next) => {
    res.set('X-Powered-By', 'PHP/7.1.7');
    next();
});

//informa sobre o uso de json nas requisições
app.use(express.json());

//inclui o arquivo de rotas
app.use(router);

//tratamento dos erros lançados pelas funções 
app.use((error, request, response, next) => {
  return response.status(Number(error.name)).json({
    status: "Error",
    message: error.message,
  })
})

export {app}