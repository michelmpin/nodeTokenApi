import "express-async-errors"
import express from 'express'
import { router } from './routes';

//Swagger
//razão do "resolveJsonModule": true no tsconfig
import swaggerDocs from "./swagger.json";
import swaggerUi from "swagger-ui-express";

const app = express();

//informa sobre o uso de json nas requisições
app.use(express.json());

/* Serving the swagger-ui-express package. */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//inclui o arquivo de rotas
app.use(router);

//tratamento dos erros lançados pelas funções 
app.use((error, request, response, next) => {
  return response.status(Number(error.stack)).json({
    status: "Error",
    message: error.message,
  })
})

/* Setting a default port value if the environment variable PORT is not set. */
const PORT = process.env.PORT || 3000;

//inicia a aplicação
app.listen(PORT, () => {
  console.log('Servidor ouvindo na porta ' + PORT)
})