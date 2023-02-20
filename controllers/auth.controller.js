import { request, response } from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../helpers/generar-jwt.js";

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    //Verificar si existe email
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(400).json({
            msg: 'El correo o contraseña son incorrectos - correo'
        })
    }
    //Comprobar que el usuario esté activo
    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'El correo o contraseña son incorrectos - estado:false'
        })
    }
    //Comprobar la password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if(!validPassword) {
        return res.status(400).json({
            msg: 'El correo o contraseña son incorrectos - password'
        })
    }
    //Generar un JWT
    const token = await generarToken(usuario.id);
    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Pongase en contacto con el administrador",
    });
  }
};

export { login };
