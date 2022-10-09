import Actor from "../models/actor.js";

const helpersActor={
  existeActorById : async (_id) => {
      const existe = await Actor.findById(_id)

      if (!existe) {
          throw new Error(`El id no existe ${_id}`)
      }
  },



  

}
export default helpersActor