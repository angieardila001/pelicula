import Pelicula from "../models/pelicula.js";

const helpersPeliculas = {
    existePeliculaById: async (id) => {
        const existe = await Pelicula.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeTitulo: async(titulo) => {
        
            const existe = await Pelicula.findOne({ titulo});
            if (existe) {
                throw new Error(`La pelicula ya existe`)
                //throw new Error(`El email ya está registrado`)
            }
        
    },
    existeSubTitulo: async(subtitulo) => {
        
            const existe = await Pelicula.findOne({ subtitulo });
            if (existe) {
                throw new Error(`El subtitulo ya existe`)
                //throw new Error(`El email ya está registrado`)
            }
        
    },
    validarMongoID: async (reparto, req) => {
        if (reparto) {   
            for (let i = 0; i < reparto.length; i++) {
                const element = reparto[i].idusuario;
                var isValid =  mongoose.Types.ObjectId.isValid(element);                
                if (!isValid)throw new Error(`Id invalido!!! `)   
            }            
        }
    },
}


export default helpersPeliculas