import Router from "express";
import { check } from "express-validator";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.controller.js";
import {
  esRolValido,
  emailExiste,
  existeUsuarioPorID,
} from "../helpers/db-validators.js";
import validarCampos from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole,tieneRole } from "../middlewares/validar-roles.js";
//import {validarCampos, validarJWT, tieneRole} from "../middlewares/index.js"

const router = Router();

router.get(
  "/",
  [
    //check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom(existeUsuarioPorID)
  ],
  usuariosGet
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe contener 6 caracteres").isLength({
      min: 6,
    }),
    check("correo").custom(emailExiste),
    //check("correo", "El correo no es válido").isEmail(),
    check("rol").custom(esRolValido),
    //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

export default router;
