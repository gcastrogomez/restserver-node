import { response, request } from "express";

const usuariosGet = (req = request, res = response) => {
  res.json({
    msg: "get API - Controlador",
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - Controlador",
    id,
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "post API - Controlador",
    nombre,
    edad,
  });
};

const usuariosDelete = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "delete API - Controlador",
    id
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
