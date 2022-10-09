
import Favorito from "../models/favorito.js"
const Get=async (req,res)=>{ //listar todos
  const peliculas= await Favorito.find()
  res.json({
    peliculas
  })
}
const usuarioGet=async (req,res)=>{
  const {idusuario}=req.params
  const favorito=await Favorito.find({idusuario}).populate("idusuario","nombre")
  res.json({favorito})
}
const Getpel=async (req,res)=>{
  const {idusuario}=req.params
  const favorito=await Favorito.find({idusuario}).populate("idusuario","nombre").populate("idpelicula",["titulo","poster","categoria","subtitulo"])
  res.json({favorito})
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
  const {idpelicula}=req.params
  const favoritos=await Favorito.findOneAndDelete({idpelicula}) 
  res.json({
      msg:` ${favoritos} Ha sido eliminada`
  })
}

export {usuarioGet,Get,titulopeliculaGet,favoritoPost,favoritoDelete,Getpel}