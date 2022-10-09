import {Router} from "express"
import {cargarArchivoCloud,mostrarImagenCloud,actorGet,GetbuscarActor,actorPost,actorDelete,idactorGet,fotoactorPost,modificaPut,cargarArchivo} from "../controllers/actor.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersActor from "../helper/actor.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"
import validarExistaArchivo from "../middleware/validar-exista-archivo.js"

const router=new Router()


router.get('/',actorGet )
router.get('/_id/:_id',[
  validarJWT,
  check('_id','complete el id').not().isEmpty(),
  check('_id').custom( helpersActor.existeActorById ),
  validarCampos
],idactorGet )

router.get('/buscarr/:nombre',[
  check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
  check('nombre','Maximo 30').isLength({ max: 30}),
],GetbuscarActor )

router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
  check('nombre','El nombre debe de ser Maximo 30').isLength({ max: 30}),
  check('biografia','complete la biografia').not().isEmpty(),
  check('biografia','La biografia Maximo 500').isLength({ max: 500}),

  check('alias','Maximo 30 el nombre alias').isLength({ max: 30}),
  validarCampos
], actorPost )

router.post('/upload/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersActor.existeActorById), 
  validarExistaArchivo,
  validarCampos
],cargarArchivo)

router.post('/foto/:foto', fotoactorPost )
router.put('/:id',[
  validarJWT,
  check('id','complete el id').not().isEmpty(),
  check('id').custom( helpersActor.existeActorById ),
  validarCampos
],modificaPut)
router.delete('/',[
  check('nombre', 'El titulo es obligatorio!').not().isEmpty(),
  check('nombre','Maximo 30').isLength({ max: 30}),
],actorDelete)

router.post('/uploadcloud/:_id',[
  validarJWT,
  check('_id', 'No es un ID válido').isMongoId(),
  check('_id').custom(helpersActor.existeActorById ), 
  validarExistaArchivo,
  validarCampos 
],cargarArchivoCloud)


router.get('/uploadcloud/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersActor.existeActorById ), 
  validarExistaArchivo,
  validarCampos 
],mostrarImagenCloud)
export default router