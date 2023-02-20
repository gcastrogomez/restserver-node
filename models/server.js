import express from "express";
import cors from "cors";
import routesUser from "../routes/usuarios.js";
import routesAuth from "../routes/auth.js";
import dbConnection from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';
    //Conectar a la base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
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
    this.app.use(this.authPath, routesAuth);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Ejecutándose en el puerto ", this.port);
    });
  }
}

export default Server;
