import { request, response } from "express";


const esAdminRole = ( req= request, res=response, next) => {
    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Se debe validar antes el token - Error en request'
        })
    }
    const {rol, nombre} =req.usuario;
    if(rol!=="ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${nombre} no es Administrador - No tiene permiso`
        })
    }
    next();
}

const tieneRole = ( ...roles ) => {
    return ( req= request, res=response, next) => {
        if(!req.usuario) {
            return res.status(500).json({
                msg: 'Se debe validar antes el token - Error en request'
            })
        }
        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next();
    }
}

export {
    esAdminRole, tieneRole
}