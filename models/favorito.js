import mongoose from "mongoose";

const FavoritosShema=new mongoose.Schema({
  idpelicula:{type:mongoose.Schema.ObjectId,ref:"Pelicula",required:true},
  datospelicula:{type:String},
  idusuario:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
  createdAT:{type:Date, default:Date.now}
})
export default mongoose.model('Favorito',FavoritosShema)