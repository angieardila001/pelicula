import Favorito from "../models/favorito.js"
import Usuario from "../models/persona.js"
import Pelicula from "../models/pelicula.js";

const helpersFavorito={
    existeFavoritoById : async (id) => {
        const existe = await Favorito.findById(id)
  
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }else{
            throw new Error(`El id ya existe ${id}`)
        }
    },
    existePeliculaById : async (idpelicula) => {
        const existe = await Favorito.findById(idpelicula)
  
        if (!existe) {
            throw new Error(`El id no existe`)
        }else{
            throw new Error(`El id ya existe `)
        }
    },
    existeUsuarioById : async (id) => {
        const existe = await Usuario.findById(id)
  
        if (!existe) {
            throw new Error(`El id usuario no existe ${id}`)
        }
    },
    existe:async(idpelicula) => {
        // return async (req, res, next) => { 
            const existe = await Favorito.findOne({idpelicula})
           
                if (existe ) {
                    throw new Error(`Ya se encuentra registrado en favoritos`) 
                    //throw new Error(`El email ya está registrado`)
                   
                    return existe
                   
                }
                
        
    },
   
}

export default helpersFavorito