
import Actor from "../models/actor.js"
import { v2 as cloudinary } from 'cloudinary'
const actorGet=async (req,res)=>{  //listar todos los actores
  const actores= await Actor.find()
  res.json({
   actores
  })
}
const idactorGet= async(req,res)=>{ //listar por id
  const {_id}=req.params
  const actores=await Actor.findById({_id})
  res.json({
    actores
  })
}
const GetbuscarActor= async(req,res)=>{ //buscar actor por nombre
  const {nombre}=req.params
  const actores=await Actor.find({nombre})
  if (actores)
      res.json({actores})
  else
      res.json(`${nombre} No encontrado`)
}

const actorPost=async(req,res)=>{ //añadir
  const{nombre,biografia,alias}=req.body
  const actores= new Actor({nombre,biografia,alias})
  actores.save()
  res.json({actores})
}
const fotoactorPost=async(req,res)=>{ //añadir foto
  const{foto}=req.body
  const actores= new Actor({foto})
  actores.save()
  res.json({actores})
}
const modificaPut = async (req, res) => {   
  const { id } = req.params;  
  const { _id, createdAt, ...resto } = req.body;
  
  const actores = await Actor.findByIdAndUpdate(id, resto);

  res.json({
      actores
  })
} 
const actorDelete=async(req,res)=>{
  const {nombre}=req.query
  const actores=await Actor.findOneAndDelete({nombre}) 
  res.json({
      msg:` ${actores} Ha sido eliminada`
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
      let actor = await Actor.findById(id);
      if (actor.foto) {
          const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
          const pathImage = path.join(__dirname, '../uploads/', actor.foto);
          
          if (fs.existsSync(pathImage)) {
              console.log('Existe archivo');
              fs.unlinkSync(pathImage)
          }
          
      }
     
      actor = await actor.findByIdAndUpdate(id, { foto: nombre })
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

  const { _id } = req.params;
  try {
      //subir archivo

      const { tempFilePath } = req.files.archivo
      cloudinary.uploader.upload(tempFilePath,
          { width: 250, crop: "limit" },
          async function (error, result) {
              if (result) {
                  let holder = await Actor.findById(_id);
                  if (holder.foto) {
                      const nombreTemp = holder.photo.split('/')
                      const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                      const [public_id] = nombreArchivo.split('.')
                      cloudinary.uploader.destroy(public_id)
                  }
                  holder = await Actor.findByIdAndUpdate(_id, { foto: result.url })
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
export {cargarArchivoCloud,mostrarImagenCloud,actorGet,GetbuscarActor,actorPost,actorDelete,idactorGet,fotoactorPost,modificaPut,cargarArchivo}