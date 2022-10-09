import Comentario from "../models/comentario.js";


const peliculaGet= async(req,res)=>{
    const {_id}=req.params
    const comentarios= await Comentario.find({idPelicula:_id}).populate("idPelicula","titulo")

    res.json({
        comentarios
    })
}
const usuarioGet= async(req,res)=>{
    const {_id}=req.params
    const comentarios= await Comentario.find({idUsuario:_id}).populate("idUsuario",["nombre","apellido"])

    res.json({
        comentarios
    })
}
const idGet= async(req,res)=>{ //listar por id
    const {id}=req.params
    const comentarios=await Comentario.findById({id})
    res.json({
      comentarios
    })
}
const Getcomentario= async(req,res)=>{ //listar por comentario
    const {comentario}=req.query
    const comentarios=await Comentario.find({comentario})
    res.json({
      comentarios
    })
}
const comentarioPost=async(req,res)=>{
    const {comentario,idPelicula,idUsuario}=req.body
    const comentarios= new Comentario({comentario,idPelicula,idUsuario})
    comentarios.save()
    res.json({comentarios})
}

const comentarioDelete=async(req,res)=>{
    const {_id}=req.query
    const comentario=await Comentario.findByIdAndDelete({_id})

    res.json({
        msg:`El comentario ha sido eliminado`
    })

}

export {peliculaGet,usuarioGet,idGet,Getcomentario,comentarioPost,comentarioDelete}