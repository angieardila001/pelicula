import {Router} from "express"
import {peliculaGet,GetTitulo,peliculaPost,peliculaDelete,idpeliculaGet,Getactor,modificaPut,cargarArchivo} from "../controllers/pelicula.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersPelicula from "../helper/pelicula.js"
import { check } from "express-validator"
import validarExistaArchivo from "../middleware/validar-exista-archivo.js"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()


router.get('/',[
  validarJWT,
  check('id','Maximo 30').isLength({ max: 30}),
  check('id','complete el id').not().isEmpty(),
  validarCampos
], peliculaGet)
router.get('/id/:id',[
  validarJWT,
  check('id','Maximo 30').isLength({ max: 30}),
  check('id','complete el id').not().isEmpty(),
  check('id').custom( helpersPelicula.existePeliculaById ),
  validarCampos
], idpeliculaGet)
router.get('/id/:id',[
  validarJWT,
  check('id', 'El id es obligatorio!').not().isEmpty(),
  check('id','Maximo 30').isLength({ max: 30}),
  validarCampos
], Getactor)
router.get('/buscar/:titulo',[
  validarJWT,
  check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
  check('titulo','Maximo 30').isLength({ max: 30}),
  validarCampos
],GetTitulo )

router.post('/',[
  check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
  check('titulo').custom( helpersPelicula.existeTitulo ),
  check('titulo','Maximo 30').isLength({ max: 30}),
  check('subtitulo', 'El subtitulo es obligatorio!').not().isEmpty(),
  check('subtitulo').custom( helpersPelicula.existeSubtitulo ),
  check('subtitulo','Maximo 30').isLength({ max: 30}),
  check('sinopsis','complete el sinopsis').not().isEmpty(),
  check('sinopsis','Maximo 300').isLength({ max: 300}),
  check('reparto').custom(helpersPelicula.validadMongoID),
  check('personaje','Maximo 25').isLength({ max: 25}),
  check('rol','Maximo 25').isLength({ max: 25}),
  check('creador','Complete el campo creador').not().isEmpty(),
  check('creador','Maximo 25').isLength({ max: 25}),
  check('duracion','Complete el campo duracion').not().isEmpty(),
  check('duracion','Maximo 25').isLength({ max: 25}),
  check('publicacion','Complete el campo publicacion').not().isEmpty(),
  check('categoria','Complete el campo categoria').not().isEmpty(),
  check('categoria','Maximo 25').isLength({ max: 25}),
  validarCampos
],peliculaPost )

router.post('/upload/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersPelicula.existePeliculaById), 
  validarExistaArchivo,
  validarCampos
],cargarArchivo)
router.put('/',[
  check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
  check('titulo','Maximo 30').isLength({ max: 30}),
  check('subtitulo', 'El subtitulo es obligatorio!').not().isEmpty(),
  check('subtitulo','Maximo 30').isLength({ max: 30}),
  check('sinopsis','complete el sinopsis').not().isEmpty(),
  check('sinopsis','Maximo 300').isLength({ max: 300}),
  check('reparto').custom(helpersPelicula.validadMongoID),
  check('personaje','Maximo 25').isLength({ max: 25}),
  check('rol','Maximo 25').isLength({ max: 25}),
  check('creador','Complete el campo creador').not().isEmpty(),
  check('creador','Maximo 25').isLength({ max: 25}),
  check('duracion','Complete el campo duracion').not().isEmpty(),
  check('duracion','Maximo 25').isLength({ max: 25}),
  check('publicacion','Complete el campo publicacion').not().isEmpty(),
  check('categoria','Complete el campo categoria').not().isEmpty(),
  check('categoria','Maximo 25').isLength({ max: 25}),
  validarCampos 
],modificaPut)
router.delete('/',[
  validarJWT,
  check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
  check('titulo','Maximo 30').isLength({ max: 30}),
  validarCampos
], peliculaDelete)

export default router