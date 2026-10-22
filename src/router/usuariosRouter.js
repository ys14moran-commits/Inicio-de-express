const {Router} = require("express")
//necesitan el controlador
const listarUsuario = require("../controller/usuariosController")
const crearUsuario = require("../controller/usuariosController")
const enrutadorUsuario = new Router()

// Listar todos los usuarios
enrutadorUsuario.get("/listado", listarUsuario);

// Buscar un usuario por su ID
//enrutadorUsuario.get("/:id", buscarUsuario);

// Crear un usuario
enrutadorUsuario.post("/crear", crearUsuario);

// Actualizar un usuario
//enrutadorUsuario.put("/actualizar/:id", actualizarUsuario);

// Eliminar un usuario
//enrutadorUsuario.delete("/borrar/:id", borrarUsuario);

module.exports = enrutadorUsuario;