import { app } from "./serverOff";

//Swagger
//razão do "resolveJsonModule": true no tsconfig
import swaggerDocs from "./swagger.json";
import swaggerUi from "swagger-ui-express";

/* Serving the swagger-ui-express package. */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* Setting a default port value if the environment variable PORT is not set. */
const PORT = process.env.PORT || 3000;

//inicia a aplicação
app.listen(PORT, () => {
  console.log('Servidor ouvindo na porta ' + PORT);
})