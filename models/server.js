import express from "express";
import cors from "cors";
import routesUser from "../routes/usuarios.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    //Middlewares
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }
  middlewares() {
    //Cors
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio público
    this.app.use( express.static('public') );
  }
  routes() {
    this.app.use(this.usuariosPath, routesUser);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Ejecutándose en el puerto ", this.port);
    });
  }
}

export default Server;
