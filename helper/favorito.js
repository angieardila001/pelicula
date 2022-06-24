import Favorito from "../models/favorito.js"
import Usuario from "../models/persona.js"
import Pelicula from "../models/pelicula.js";

const helpersFavorito={
    existeFavoritoById : async (id) => {
        const existe = await Favorito.findById(id)
  
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existePeliculaById : async (id) => {
        const existe = await Pelicula.findById(id)
  
        if (!existe) {
            throw new Error(`El id pelicula no existe ${id}`)
        }
    },
    existeUsuarioById : async (id) => {
        const existe = await Usuario.findById(id)
  
        if (!existe) {
            throw new Error(`El id usuario no existe ${id}`)
        }
    },
}

export default helpersFavorito