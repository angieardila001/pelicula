import {Router} from "express"
import {cargarArchivoCloud,mostrarImagenCloud,postlogin,usuarioGet,usuarioPost, usuarioDelete,PutActivate,PutDeActivate, modificaPut,fotoPost,emailusuarioGet,nombreusuarioGet,idusuarioGet} from "../controllers/persona.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersUsuarios from "../helper/persona.js"
import { validarJWT  } from "../middleware/validartoken.js"
import { check } from "express-validator"
import validarExistaArchivo from "../middleware/validar-exista-archivo.js"
const router=new Router()

router.post('/post',[
  // check('cc','la cedula es obligatoria').not().isEmpty(),
  // check('cc', 'La cedula minimo es de 10').isLength({ min: 10}),
  check('rol', 'El rol es obligatorio!').not().isEmpty(),
  check('rol', 'El rol es de maximo 25').isLength({ max: 25}),
  check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
  check('nombre', 'El nombre es de maximo 25').isLength({ max: 25}),
  check('apellido', 'El apellido es obligatorio!').not().isEmpty(),
  check('apellido', 'El apellido es de maximo 25').isLength({ max: 25}),
  check('email', 'El correo no es válido').isEmail().exists(),
  check('email').custom( helpersUsuarios.existeEmail),
  check('password', 'Password no es válido').isLength({ min: 8}),
  
  validarCampos       
], usuarioPost) //añadir
router.post('/login1',[
  check('email', 'El correo: complete el campo por favor').isEmail(),
  check('password', 'Password: complete el campo por favor').not().isEmpty(),
  validarCampos
],postlogin)
router.get('/', usuarioGet) //listar todosdd



router.get('/buscaemail',[  //listar por email
  validarJWT,
  check('email').custom( helpersUsuarios.existeEmail ),
  validarCampos
],emailusuarioGet)

router.get('/buscanombre',[  //listar por nombre
  validarJWT,
  check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
  validarCampos
],nombreusuarioGet)
router.get('/idusuario/:_id',[   //listar por id usuario
  validarJWT,
  check('_id','ingresa el id').not().isEmpty(),
  check('_id').custom( helpersUsuarios.existeUsuarioById),
  validarCampos
],idusuarioGet)
router.post('/foto',[
  check('foto','ingresa la foto').not().isEmpty(),
  validarCampos
],fotoPost)
// router.post('/', usuarioPost)

router.put('/:id',[
  validarJWT,
  check('id','ingresa el id').not().isEmpty(),
  check('id').custom( helpersUsuarios.existeUsuarioById),



  check('rol', 'El rol es obligatorio!').not().isEmpty(),
  check('rol', 'El rol es de maximo 25').isLength({ max: 25}),
  check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
  check('nombre', 'El nombre es de maximo 25').isLength({ max: 25}),
  check('apellido', 'El apellido es obligatorio!').not().isEmpty(),
  check('apellido', 'El apellido es de maximo 25').isLength({ max: 25}),
  check('email', 'El correo no es válido').isEmail().exists(),

  check('password', 'Password no es válido').isLength({ min: 8}),
  validarCampos

],modificaPut)
router.put('/activa/:id',[
  validarJWT,
  check('id','ingresa el id').not().isEmpty(),
  check('id').custom( helpersUsuarios.existeUsuarioById),
  validarCampos
],PutActivate)
router.put('/desactiva/:id',[
  validarJWT,
  check('id','ingresa el id').not().isEmpty(),
  check('id').custom( helpersUsuarios.existeUsuarioById),
  validarCampos
],PutDeActivate)

router.delete('/',[
  check('email', 'ingresa el email').not().isEmpty(),
  validarCampos
], usuarioDelete )
router.post('/uploadcloud/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersUsuarios.existeUsuarioById), 
  validarExistaArchivo,
  validarCampos
],cargarArchivoCloud)


router.get('/uploadcloud/:id',[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(helpersUsuarios.existeUsuarioById), 
  validarExistaArchivo,
  validarCampos 
],mostrarImagenCloud)

export default router