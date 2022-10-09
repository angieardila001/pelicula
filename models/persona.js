import mongoose from "mongoose";
const UsuarioShema= new mongoose.Schema({
  // cc:{type:String, minlength:10, required:true},
  rol:{type:String, maxlength:25, required:true},
  nombre:{type:String, maxlength:25, required:true},
  apellido:{type:String, maxlength:25, required:true},
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true, minlength:6},
  estado:{type:Number, default:1},
  foto:{type:String},
  createdAT:{type:Date, default:Date.now}
})

export default mongoose.model('Usuario',UsuarioShema)