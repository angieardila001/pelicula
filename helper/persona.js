import Usuario from "../models/persona.js"


const helpersUsuarios={
    existeUsuarioById : async (_id) => {
        const existe = await Usuario.findById(_id)

        if (!existe) {
            throw new Error(`El id no existe ${_id}`)
        }
    },

    existeEmail:async(email) => {
        // return async (req, res, next) => { 
            const existe = await Usuario.findOne({ email});
        
                if (existe ) {
                    //return res.status(401).json({ msg: `El email ya está registrado` });
                    throw new Error(`El email ya está registrado`)
                }
        
        
    },
    

    

}
export default helpersUsuarios