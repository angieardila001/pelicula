import Pelicula from "../models/pelicula.js";

const helpersPelicula={
  existePeliculaById : async (id) => {
      const existe = await Pelicula.findById(id)

      if (!existe) {
          throw new Error(`El id no existe ${id}`)
      }
  },

  existeTitulo :() => {
      return async (req, res, next) => {
          const existe = await Pelicula.findOne({ titulo: req.body.titulo });
      
              if (existe ) {
                  return res.status(401).json({ msg: `la pelicula ya esta registrada` });
                  //throw new Error(`El email ya está registrado`)
              }
      
      }
  },
  existeSubtitulo :() => {
    return async (req, res, next) => {
        const existe = await Pelicula.findOne({ subtitulo: req.body.subtitulo });
    
            if (existe ) {
                return res.status(401).json({ msg: `la pelicula ya esta registrada` });
                //throw new Error(`El email ya está registrado`)
            }
    
    }
},
validadMongoID: async (reparto, req) => {
    if (reparto) {   
        for (let i = 0; i < reparto.length; i++) {
            const element = reparto[i].idusuario;
            var isValid =  mongoose.Types.ObjectId.isValid(element);                
            if (!isValid)throw new Error(`Id invalido!!! `)   
        }            
    }
},

  

}
export default helpersPelicula