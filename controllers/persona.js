import Usuario from "../models/persona.js"
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middleware/validartoken.js";
import { v2 as cloudinary } from 'cloudinary'
const usuarioGet=async (req,res)=>{
  const usuarios= await Usuario.find()
  res.json({
    usuarios
  })
}               

const idusuarioGet= async(req,res)=>{
  const {_id}=req.params
  const usuarios=await Usuario.findById({_id})
  res.json({
    usuarios
  })
}


const postlogin= async(req,res)=>{

  const { email, password } = req.body;

  
  try {
      const usuario = await Usuario.findOne({ email })
      if (!usuario) {
          return res.status(400).json({
              msg: "Usuario / Password no son correctos"
          })
      }


      if (usuario.estado === 0) {
          return res.status(400).json({
              msg: "Usuario Inactivo"
          })
      }

      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
          return res.status(400).json({
              msg: "Usuario / Password no son correctos"
          })
      }

      const token = await generarJWT(usuario.id);

      res.json({
          usuario,
          token
      })

  } catch (error) {
      return res.status(500).json({
          msg: "Hable con el WebMaster"
      })
  }
}
const nombreusuarioGet= async(req,res)=>{
  const {nombre}=req.query
  const usuarios=await Usuario.find({nombre})
  res.json({
    usuarios
  })
}
const emailusuarioGet= async(req,res)=>{
  const {email}=req.query
  const usuarios=await Usuario.find({email})
  res.json({
    usuarios
  })
}
const usuarioPost=async(req,res)=>{ //añadir
  const{rol,nombre,apellido,email,password}=req.body
  const usuario= new Usuario({rol,nombre,apellido,email,password})
  const salt= bcryptjs.genSaltSync(10)
  usuario.password=bcryptjs.hashSync(password,salt)
  usuario.save()
  res.json({usuario})
}

const fotoPost=async(req,res)=>{
  const{foto}=req.body
  const usuario=new Usuario({foto})
  usuario.save()
  res.json({usuario})
}

const modificaPut = async (req, res) => {   
  const { id } = req.params;  
  const { _id, createdAt,estado, ...resto } = req.body;
  
  const articulo = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
      articulo
  })
}
const usuarioDelete=async(req,res)=>{
  const {email}=req.query
  const persona=await Usuario.findOneAndDelete({email}) 
  res.json({
      msg:` Ha sido eliminada`
  })
}
const PutActivate=async (req, res) => {   
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, {estado:1});

  res.json({
      usuario
  })
}

const PutDeActivate=async (req, res) => {   
  const { id } = req.params;
  const usuarios = await Usuario.findByIdAndUpdate(id, {estado:0});

  res.json({
      usuarios
  })
}
const cargarArchivoCloud=async (req, res) => {
  cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true
  });

  const { id } = req.params;
  try {
      //subir archivo

      const { tempFilePath } = req.files.archivo
      cloudinary.uploader.upload(tempFilePath,
          { width: 250, crop: "limit" },
          async function (error, result) {
              if (result) {
                  let holder = await Usuario.findById(id);
                  if (holder.foto) {
                      const nombreTemp = holder.photo.split('/')
                      const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                      const [public_id] = nombreArchivo.split('.')
                      cloudinary.uploader.destroy(public_id)
                  }
                  holder = await Usuario.findByIdAndUpdate(id, { foto: result.url })
                  //responder
                  res.json({ url: result.url });
              } else {
                  res.json(error)
              }

          })
  } catch (error) {
      res.status(400).json({ error, 'general': 'Controlador' })
  }
}




const mostrarImagenCloud= async (req, res) => {
  const { id } = req.params

  try {
      let holder = await Usuario.findById(id)
      if (holder.photo) {
          return res.json({ url: holder.photo })
      }
              res.status(400).json({ msg: 'Falta Imagen' })
          } catch (error) {
              res.status(400).json({ error })

              }
            }
export {cargarArchivoCloud,mostrarImagenCloud,usuarioGet,usuarioPost, usuarioDelete, PutActivate,PutDeActivate,modificaPut,fotoPost,emailusuarioGet,nombreusuarioGet,idusuarioGet,postlogin}