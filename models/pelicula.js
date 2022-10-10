import mongoose from "mongoose";
const PeliculaSchema= new mongoose.Schema({
    titulo:{type:String, maxlength:50, required:true},
    subtitulo:{type:String, maxlength:50},
    sinopsis:{type:String, maxlength:500, required:true},
    duracion:{type:String, maxlength:25, required:true},
    fechaPublicacion:{type:Date, require:true},
    categoria:{type:String, maxlength:25,required:true},
    reparto:[
        {
        idactor:{type:mongoose.Schema.ObjectId, ref:"Actor"},
        datosactor:{type:String},
        personaje:{type:String, maxlength:35},
        rol:{type:String,maxlength:30}, 
        }
    ],
    poster:{type:String},
    creador:{type:String, maxlength:35,required:true},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Pelicula', PeliculaSchema)