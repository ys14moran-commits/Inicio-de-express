const express = require ("express");
const app = express();
require("dotenv/config")
const puerto = process.env.PUERTO || 3000;
//configurar para la lectura del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")
//importal libreria para subir archivos
const multer = require("multer")

//middlewa body-parse, formatea los datos enviados
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//enpoin raiz
app.get("/", function(req, res){
    res.send("Hola aprendiz");
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


//validar que se envien los datos
app.post("/api/aprendices", function(req, res){
    const nuevoAprendiz = req.body
    //utilizamos la lectura del archivo
    sistemaArchivo.readFile(rutaArchivoJson,"utf-8", (error, datos) =>{
        if(error){
            return res.json({Error: "no se puede leer los datos"})
        }
        const listaAprendices =JSON.parse(datos)
        //agregar un nuevo aprendiz
        listaAprendices.push(nuevoAprendiz)
        //escribir en el archibo
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) =>{
            if(error){
    return res.status(500).json({Error: "No se puede registrar el aprendiz"})
                    }
            res.status(201).json({Mensaje: "Aprendiz creado con exito"})
        })
    })
})



app.listen(puerto, function(){
    console.log(`Servidor corriendo exitosamente en el puerto http://localhost:${puerto}`);
    
}); 