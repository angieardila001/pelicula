import mongoose from "mongoose";

const ActoresShema=new mongoose.Schema({
  nombre:{type:String,maxlength:30,required:true},
  foto:{type:String},
  biografia:{type:String,maxlength:500,required:true},
  alias:{type:String,maxlength:30},
  createdAT:{type:Date, default:Date.now}
})
export default mongoose.model('Actor',ActoresShema)