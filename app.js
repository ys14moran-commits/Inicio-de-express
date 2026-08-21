const express = require ("express");
const app = express();
require("dotenv/config")
const puerto = process.env.PUERTO || 3000;
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")

app.get("/", function(req, res){
    res.send("Api - rest aprendices");
});

app.get("/api/aprendices", function(req, res){
    sistemaArchivo.readFile(rutaArchivoJson,"utf-8", (error, datos) =>{
        if(error){
            return res.json({Error: "no se puede leer los datos"})
        }
        const listaAprendices =JSON.parse(datos)
        res.json(listaAprendices)
    })
})


app.listen(puerto, function(){
     console.log(`Servidor corriendo exitosamente en el puerto http://localhost:${puerto}`);
    
}); 