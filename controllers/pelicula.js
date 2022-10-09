import Pelicula from "../models/pelicula.js"
import subirArchivo from "../helper/subir-archivo.js"
import { v2 as cloudinary } from 'cloudinary'
const peliculaGet=async (req,res)=>{ //listar todos
  const peliculas= await Pelicula.find()
  res.json({
    peliculas
  })
}
const idpeliculaGet= async(req,res)=>{ //listar por id
  const {_id}=req.params
  const peliculas=await Pelicula.find({_id})
  res.json({
    peliculas
  })
}
const idGet= async(req,res)=>{ //listar por id
  const {_id}=req.params
  const peliculas=await Pelicula.find({idactor:_id}).populate("reparto.idactor","nombre")
  res.json({
    peliculas
  })
}
const GetTitulo= async(req,res)=>{  //buscar por titulo
  const {titulo}=req.params
  const peliculas=await Pelicula.find(
    {
      $or:[
        {titulo:new RegExp(titulo,"i")},
        {subtitulo:new RegExp(titulo,"i")}
      ]
    }
  )
  if (peliculas)
      res.json({peliculas})
  else
      res.json(`${titulo} No encontrado`)
}
const GetCategoria= async(req,res)=>{  //buscar por titulo
  const {categoria}=req.params
  const peliculas=await Pelicula.find(
    {
      $or:[
        {categoria:new RegExp(categoria,"i")},
        {categoria:new RegExp(categoria,"i")}
      ]
    }
  )
  if (peliculas)
      res.json({peliculas})
  else
      res.json(`${titulo} No encontrado`)
}
const Getactor= async(req,res)=>{  //buscar por actor
  const {id}=req.params;
  const peliculas = await Pelicula.find().where('reparto.idactor').in(id).exec();
  res.json({
      peliculas
  })
}

const peliculaPost=async(req,res)=>{ //añadir
  const{titulo,subtitulo,sinopsis,reparto,duracion,creador,fechaPublicacion,categoria}=req.body
  const peliculas= new Pelicula({titulo,subtitulo,sinopsis,reparto,duracion,creador,fechaPublicacion,categoria})
  peliculas.save()
  res.json({peliculas})
}

// const posterPost=async(req,res)=>{ //añadir poster
//   const{foto}=req.body
//   const peliculas= new Pelicula({foto})
//   peliculas.save()
//   res.json({pelicula})
// }

const modificaPut = async (req, res) => {   
  const { id } = req.params;  
  const { _id, createdAt,idactor, ...resto } = req.body;
  
  const peliculas = await Pelicula.findByIdAndUpdate(id, resto);

  res.json({
    peliculas
  })
} 

const peliculaDelete=async(req,res)=>{
  const {titulo}=req.params
  const pelicula=await Pelicula.findOneAndDelete({titulo}) 
  res.json({
      msg:` ${titulo} Ha sido eliminada`
  })
}

const cargarArchivo= async (req, res) => {
  const { id } = req.params;
  try {
      let nombre
      await subirArchivo(req.files, undefined)
          .then(value => nombre = value)
          .catch((err) => console.log(err));

      //persona a la cual pertenece la foto
      let pelicula = await Pelicula.findById(id);
      if (pelicula.foto) {
          const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
          const pathImage = path.join(__dirname, '../uploads/', pelicula.foto);
          
          if (fs.existsSync(pathImage)) {
              console.log('Existe archivo');
              fs.unlinkSync(pathImage)
          }
          
      }
     
      pelicula = await Pelicula.findByIdAndUpdate(id, { foto: nombre })
      //responder
      res.json({ nombre });
  } catch (error) {
      res.status(400).json({ error, 'general': 'Controlador' })
  }

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
                  let holder = await Pelicula.findById(id);
                  if (holder.poster) {
                      const nombreTemp = holder.photo.split('/')
                      const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                      const [public_id] = nombreArchivo.split('.')
                      cloudinary.uploader.destroy(public_id)
                  }
                  holder = await Pelicula.findByIdAndUpdate(id, { poster: result.url })
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
      let holder = await Pelicula.findById(id)
      if (holder.photo) {
          return res.json({ url: holder.photo })
      }
              res.status(400).json({ msg: 'Falta Imagen' })
          } catch (error) {
              res.status(400).json({ error })

              }
            }
export {idGet,peliculaGet,GetCategoria,GetTitulo,peliculaPost,peliculaDelete,idpeliculaGet,Getactor,modificaPut,cargarArchivo,cargarArchivoCloud,mostrarImagenCloud}