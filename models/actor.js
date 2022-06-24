import mongoose from "mongoose";

const ActoresShema=new mongoose.Schema({
  nombre:{type:String,maxlength:30,required:true},
  foto:{type:String},
  biografia:{type:String,maxlength:100},
  alias:{type:String,maxlength:30,required:true},
  createdAT:{type:Date, default:Date.now}
})
export default mongoose.model('Actor',ActoresShema)