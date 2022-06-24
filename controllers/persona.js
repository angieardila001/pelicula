import Usuario from "../models/persona.js";
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middleware/validartoken.js";
const usuarioGet=async (req,res)=>{
  const usuarios= await Usuario.find()
  res.json({
    usuarios
  })
}

const idusuarioGet= async(req,res)=>{
  const {id}=req.query
  const usuarios=await Usuario.findById({id})
  res.json({
    usuarios
  })
}
const usuarioGetLogin= async(req,res)=>{
  /* const {email,password}=req.query
  const usuario=await Usuario.findOne({email})
  const validar=bcryptjs.compareSync(password,usuario.password)
  if(validar)
      res.json({msg:"Bienvenido"})
  else
      res.json({msg:"Contraseña incorrecta"}) */
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
  const{nombre,apellido,email,password}=req.body
  const usuario= new Usuario({nombre,apellido,email,password})
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
export {usuarioGet,  usuarioGetLogin,usuarioPost, usuarioDelete, PutActivate,PutDeActivate,modificaPut,fotoPost,emailusuarioGet,nombreusuarioGet,idusuarioGet}