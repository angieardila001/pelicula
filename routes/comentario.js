import {Router} from "express"
import { peliculaGet,usuarioGet,idGet,Getcomentario, comentarioPost, comentarioDelete } from "../controllers/comentario.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersComentario from "../helper/comentario.js"
import helpersUsuarios from "../helper/persona.js"
import helpersPelicula from "../helper/pelicula.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()


router.get('/pelicula',[
    validarJWT,
    check('idPelicula','complete el id pelicula').not().isEmpty(),
    check('idPelicula').custom( helpersPelicula.existePeliculaById ),
    validarCampos
],peliculaGet)
router.get('/usuario',[
    validarJWT,
    check('idUsuario','complete el id usuario').not().isEmpty(),
    check('idUsuario').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
],usuarioGet)
router.get('/id/:id',[
    validarJWT,
    check('id','complete el id').not().isEmpty(),
    check('id').custom( helpersComentario.existeComentarioById ),
    validarCampos
],idGet)
router.get('/comentario',[
    validarJWT,
    check('comentario','Maximo 200').isLength({ max: 200}),
    check('comentario','complete el comentario').not().isEmpty(),
    validarCampos
],Getcomentario)
router.post('/',[
    check('comentario','Maximo 200').isLength({ max: 200}),
    check('comentario','complete el comentario').not().isEmpty(),
    validarCampos
], comentarioPost)

router.delete('/',[
    validarJWT,
    check('id','complete el id').not().isEmpty(),
    check('id').custom( helpersComentario.existeComentarioById ),
    validarCampos
],comentarioDelete)

export default router