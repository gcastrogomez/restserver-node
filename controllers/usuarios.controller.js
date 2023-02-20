import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosGet = async (req = request, res = response) => {
  //const id = req.params.id;
  const {limite=1, desde=0} = req.query;
  const query= {estado: true};
  const [usuarios, total] = await Promise.all([Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite)),
    Usuario.countDocuments(query)
  ]);
  res.json({
    total,
    usuarios
  });
};

const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...resto } = req.body;
  //Todo validar contra base de datos
  if(password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id,resto);
  res.json({
    usuario
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //Verificar si existe el correo
  
  //Encriptar la password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //Guardar en BD
  await usuario.save();
  res.json({
    usuario,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const {id} = req.params;
  //Borramos fisicamente
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
  const usuarioAutenticado = req.usuario;
  res.json({
    usuario, 
    usuarioAutenticado
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "patch API - Controlador",
  });
};

export {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
