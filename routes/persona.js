import {Router} from "express"
import {usuarioGet,  usuarioGetLogin,usuarioPost, usuarioDelete,PutActivate,PutDeActivate, modificaPut,fotoPost,emailusuarioGet,nombreusuarioGet,idusuarioGet} from "../controllers/persona.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersUsuarios from "../helper/persona.js"
import { validarJWT  } from "../middleware/validartoken.js"
import { check } from "express-validator"
const router=new Router()

router.post('/post',[
  // check('cc','la cedula es obligatoria').not().isEmpty(),
  // check('cc', 'La cedula minimo es de 10').isLength({ min: 10}),
  check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
  check('nombre', 'El nombre es de maximo 25').isLength({ max: 25}),
  check('apellido', 'El apellido es obligatorio!').not().isEmpty(),
  check('apellido', 'El apellido es de maximo 25').isLength({ max: 25}),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom( helpersUsuarios.existeEmail ),
  check('password', 'Password no es válido').isLength({ min: 8}),
  validarCampos       
], usuarioPost) //añadir

router.get('/', usuarioGet) //listar todos

router.get('/login',[ //login
  check('email', 'El correo no es válido').isEmail(),
  check('password', 'Password incorrecto').not().isEmpty(),
  validarCampos
], usuarioGetLogin )
router.get('/busemail',[
  validarJWT,
  check('email').custom( helpersUsuarios.existeEmail ),
  validarCampos
],emailusuarioGet)

router.get('/buscanombre',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
  validarCampos
],nombreusuarioGet)
router.get('/idusuario',[
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

export default router