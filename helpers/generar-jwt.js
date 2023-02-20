import jwt from "jsonwebtoken";

const generarToken = (uid='') => {
    return new Promise( (resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETKEYJWT, {
            expiresIn: '4h'
        }, (err,token) => {
            if(err) {
                console.log(err);
                reject('Error al generar el token');
            } else {
                resolve(token);
            }
        })
    })
}

export {generarToken};