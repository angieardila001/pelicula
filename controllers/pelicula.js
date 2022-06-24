import Pelicula from "../models/pelicula.js"
import subirArchivo from "../helper/subir-archivo.js"
const peliculaGet=async (req,res)=>{ //listar todos
  const {_id}=req.params
  const peliculas= await Pelicula.find({idactor:_id}).populate("idactor",["nombre","foto","alias"])
  res.json({
    peliculas
  })
}
const idpeliculaGet= async(req,res)=>{ //listar por id
  const {id}=req.params
  const peliculas=await Pelicula.findById({id})
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

const Getactor= async(req,res)=>{  //buscar por actor
  const {id}=req.params;
  const peliculas = await Pelicula.find().where('reparto.idactor').in(id).exec();
  res.json({
      peliculas
  })
}

const peliculaPost=async(req,res)=>{ //añadir
  const{titulo,subtitulo,sinopsis,reparto,duracion,creador,publicacion,categoria}=req.body
  const peliculas= new Pelicula({titulo,subtitulo,sinopsis,reparto,duracion,creador,publicacion,categoria})
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
  const {titulo}=req.query
  const pelicula=await Pelicula.findOneAndDelete({titulo}) 
  res.json({
      msg:` ${pelicula} Ha sido eliminada`
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
export {peliculaGet,GetTitulo,peliculaPost,peliculaDelete,idpeliculaGet,Getactor,modificaPut,cargarArchivo}