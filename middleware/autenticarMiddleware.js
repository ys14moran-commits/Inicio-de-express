const jwt = require ("jsonwebtoken")
//funcion para generar -verificador
const autenticarMiddelware = (req, res, next)=>{
    //capturar el token enviado por el usuario
    const token = req.header("autenticar")?.split(" ")[1]
    if(!token){
        res.status(401).json({mensaje:"Accesos denegado no proporciona token"})
    }
    //verificar
    jwt.verify(token, process.env.JWT_SECRETO,(error,usuario)=>{
        if(error){
            res.status(403).json({mensaje: "Token invalidado."})
        }
        req.usuario = usuario
    })

}

module.exports = autenticarMiddelware