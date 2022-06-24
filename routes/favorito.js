import {Router} from "express"
import {usuarioGet,peliculaGet,titulopeliculaGet,favoritoPost,favoritoDelete} from "../controllers/favorito.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersFavorito from "../helper/favorito.js"
import helpersPelicula from "../helper/pelicula.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()


router.get('/usuario/:_id',[
    validarJWT,
    check('idusuario','Maximo 30').isLength({ max: 30}),
    check('idusuario','complete el id usuario').not().isEmpty(),
    check('idusuario').custom( helpersFavorito.existeUsuarioById ),
    validarCampos
],usuarioGet )
router.get('/pelicula/:_id',[
    validarJWT,
    check('idpelicula','Maximo 30').isLength({ max: 30}),
    check('idpelicula','complete el id pelicula').not().isEmpty(),
    check('idpelicula').custom( helpersFavorito.existeFavoritoById ),
    validarCampos
],peliculaGet )
router.get('/id/:titulo',[
    check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('titulo').custom( helpersPelicula.existeTitulo ),
    check('titulo','Maximo 30').isLength({ max: 30}),
    check('subtitulo', 'El subtitulo es obligatorio!').not().isEmpty(),
    check('subtitulo').custom( helpersPelicula.existeSubtitulo ),
],titulopeliculaGet )
router.post('/', [
    validarJWT,
    check('idpelicula','Maximo 30').isLength({ max: 30}),
    check('idpelicula','complete el id pelicula').not().isEmpty(),
    check('idpelicula').custom( helpersFavorito.existePeliculaById ),
    check('idusuario','Maximo 30').isLength({ max: 30}),
    check('idusuario','complete el id usuario').not().isEmpty(),
    check('idusuario').custom( helpersFavorito.existeUsuarioById ),
    validarCampos
],favoritoPost )

router.delete('/:_id',[
    check('idpelicula','Maximo 30').isLength({ max: 30}),
    check('idpelicula','complete el id pelicula').not().isEmpty(),
    check('idpelicula').custom( helpersFavorito.existeFavoritoById ),
],favoritoDelete)

export default router