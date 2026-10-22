const {Router} = require("express")

const enrutadorUsuario = require("./usuariosRouter")

const enrutadorGeneral = new Router()

enrutadorGeneral.use("/usuarios",enrutadorUsuario)

//enrutadorGeneral.use("/productos", enrutadorProductos)

module.exports = enrutadorGeneral