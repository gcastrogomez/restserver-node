import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado en la base de datos`);
  }
};

const existeUsuarioPorID = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);;
  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe en la base de datos`);
  }
};

export {
  esRolValido,
  emailExiste,
  existeUsuarioPorID
};
