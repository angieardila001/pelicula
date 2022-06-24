import Favorito from "../models/favorito.js"

const usuarioGet=async (req,res)=>{
  const {_id}=req.params
  const favorito=await Favorito.find({idusuario:_id}).populate("idusuario","nombre")
  res.json({favorito})
}
const peliculaGet=async (req,res)=>{
  const {_id}=req.params
  const favoritos=await Favorito.find({idpelicula:_id}).populate("idpelicula","titulo")
  res.json({favoritos})
 

}
const titulopeliculaGet= async(req,res)=>{ //listar por titulo
    const {titulo}=req.params
    const favoritos=await Favorito.find(
      {
        $or:[
          {titulo:new RegExp(titulo,"i")},
          {subtitulo:new RegExp(titulo,"i")}
        ]
      }
    )
    if (favoritos)
        res.json({favoritos})
    else
        res.json(`${titulo} No encontrado`)
}
const favoritoPost=async(req,res)=>{
  const{idpelicula,idusuario}=req.body
  const favoritos= new Favorito({idpelicula,idusuario})
  favoritos.save()
  res.json({favoritos})
}

const favoritoDelete=async(req,res)=>{
  const {_id}=req.params
  const favoritos=await Favorito.findOneAndDelete({_id}) 
  res.json({
      msg:` ${favoritos} Ha sido eliminada`
  })
}

export {usuarioGet,peliculaGet,titulopeliculaGet,favoritoPost,favoritoDelete}