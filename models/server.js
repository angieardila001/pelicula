import express from "express"
import cors from "cors"
import { dbConnection } from "../database/config.js"
import persona from "../routes/persona.js"
import pelicula from "../routes/pelicula.js"
import actor from "../routes/actor.js"
import favorito from "../routes/favorito.js"
import comentario from "../routes/comentario.js"
import fileUpload from 'express-fileupload'
class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.port=process.env.PORT
        this.conectarBd()
        this.routes()
        //this.escuchar()
    }

    routes(){
        this.app.use("/api/usuario",persona)
        this.app.use("/api/pelicula",pelicula)
        this.app.use("/api/actor",actor)
        this.app.use("/api/favorito",favorito)
        this.app.use("/api/comentario",comentario)

    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        // this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }

    async conectarBd(){
        await dbConnection()
    }

    escuchar() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }
}
//export default Server//exportar 1 sola cosa
export default Server