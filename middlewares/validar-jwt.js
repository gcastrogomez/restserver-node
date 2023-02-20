import { request, response } from "express";
import Usuario from '../models/usuario.js';
import jwt from "jsonwebtoken";

const validarJWT = async (req=request, res= response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            msg: 'No se ha recibido el token'
        });
    }
    try {
        const {uid}=jwt.verify(token, process.env.SECRETKEYJWT);
        const usuario= await Usuario.findById(uid);
        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en BD'
            })
        }
        //Verificar si el usuario no está borrado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            })
        }
        req.usuario=usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'El token no es válido'
        })
    }
}

export {validarJWT};