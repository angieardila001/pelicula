import {Router} from "express"
import {idGet,peliculaGet,GetTitulo,peliculaPost,peliculaDelete,idpeliculaGet,Getactor,modificaPut,cargarArchivo,cargarArchivoCloud,mostrarImagenCloud, GetCategoria} from "../controllers/pelicula.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersPelicula from "../helper/pelicula.js"
import { check } from "express-validator"
import subirArchivo from "../helper/subir-archivo.js"
import validarExistaArchivo from "../middleware/validar-exista-archivo.js"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()
router.get('/get/:_id',[

 
  validarCampos
], idGet)

router.get('/',[

 
  validarCampos
], peliculaGet)
router.get('/id/:id',[
  validarJWT,
  check('id','complete el id').not().isEmpty(),
  check('id').custom( helpersPelicula.existePeliculaById ),
  validarCampos
], idpeliculaGet)
router.get('/id/:id',[
  validarJWT,
  check('id', 'El id es obligatorio!').not().isEmpty(),
  validarCampos
], Getactor)
router.get('/buscar/:titulo',[
  validarJWT,
  check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
  check('titulo','Maximo 30').isLength({ max: 30}),
  validarCampos
],GetTitulo )
router.get('/categoria/:categoria',[
  validarJWT,
  check('categoria', 'El categoria es obligatorio!').not().isEmpty(),
  check('categoria','Maximo 30').isLength({ max: 30}),
  validarCampos
],GetCategoria )
router.post('/post',[
validarJWT,
    check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('titulo').custom( helpersPelicula.existeTitulo ),
    check('titulo').isLength({max:50}),

  
    check('subtitulo').custom( helpersPelicula.existeSubTitulo ),
    check('subtitulo').isLength({max:50}),

    check('sinopsis', 'La sinopsis es obligatoria!').not().isEmpty(),
    check('sinopsis').isLength({max:500}),

    check('duracion', 'La duracion es obligatoria!').not().isEmpty(),
    check('duracion', 'la duracion maximo 10').isLength({max:10}),

    check('fechaPublicacion').isLength({max:50}),
    check('fechaPublicacion', 'La fecha de publicación es obligatoria!').not().isEmpty(),

    check('categoria','la categoria es de maximo 50').isLength({max:50}),
    check('categoria', 'La categoria es obligatoria!').not().isEmpty(),

    
   
    check('reparto').isLength({max:50}),
    check('personaje','el personaje maximo de 25').isLength({max:25}),
    check('rol','el rol es de maximo 15').isLength({max:15}),
    

    check('creador', 'El nombre del creador es obligatoria!').not().isEmpty(),
    check('creador','el creador es de maximo 35').isLength({max:35}), 
 

    validarCampos
],peliculaPost )

router.post('/upload/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersPelicula.existePeliculaById), 
  validarExistaArchivo,
  validarCampos
],cargarArchivo)
router.put('/:id',[
  validarJWT,
 
  validarCampos 
],modificaPut)
router.delete('/titulo/:titulo',[
  validarJWT,
  check('titulo', 'El titulo es obligatorio!').not().isEmpty(),

  validarCampos
], peliculaDelete)
router.post('/uploadcloud/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersPelicula.existePeliculaById), 

  
  validarExistaArchivo,
  validarCampos
],cargarArchivoCloud)


router.get('/uploadcloud/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersPelicula.existePeliculaById), 

  subirArchivo,
  validarExistaArchivo,
  validarCampos 
],mostrarImagenCloud)
export default router