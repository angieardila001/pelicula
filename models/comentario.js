import mongoose from "mongoose"

const ComentariosSchema= new mongoose.Schema({
    idPelicula:{type:mongoose.Schema.ObjectId, ref:"Pelicula", required:true},
    idUsuario:{type:mongoose.Schema.ObjectId,  ref:"Usuario", required:true},
    comentario:{type:String, maxlength:200, required:true},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Comentario', ComentariosSchema)