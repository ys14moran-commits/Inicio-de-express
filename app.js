//const express = require("express")
import express from 'express';

//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 5050;
//uso de middleware body-parse
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/", (_, res) => {
  res.send("Aprendiendo express, ficha 3407181, ADSO en el curso de desarrollo web el 31 de julio de 2026");
});

app.get ("/otraruta", (req, res)=>{
    res.send(`<h1>Otra ruta ejemplo</h1>
        <h2>End point con res.send</h2>`)
});

app.get ("/ruta2", (req, res)=>{
    res.json({"nombre" : "yo", "apellido": "no", "cargo": "mucho"})
});

app.get ("/ruta3/:aprendiz/:otrodato", (req, res)=>{
    const dato_aprendiz = req.params.aprendiz
    const otro_dato = req.params.otrodato
    res.json({"nombre": dato_aprendiz, "otro": otro_dato})
});

app.get("/ruta4",(req, res) =>{
    const orden = req.query.orden || "sin ordenar"
    const pagina = req.query.pagina || 1
    res.send(`<h1>Lista aprendices </h1>
        <p>El listado esta en orden ${orden}</p>
        <p>pagina: ${pagina}</p>
        `)
})

//endpoint para envio de datos
app.post("/Ruta2",(req, res)=>{
    const todosDatos = req.body
    const name = req.body.nombre
    const lastname = req.body.Cargo
    res.status(201).json({Datos: todosDatos, nombre:name,
        cargo : lastname
    })
})

// Actividad : endpoint login
app.post("/login", function(req, res){

    const usuario = req.body.usuario
    const perfil = req.body.perfil
    const clave = req.body.clave

    if (perfil === "admin" &&  clave === "12345"){
        return res.send (`Bienvenido administrador: ${usuario}, Clave correcta: ${clave}`)
    }

    else {
        return res.send (`Clave incorrecta: ${clave}`)
    }

})

//formulario
app.post("/formulario", (req, res) =>{
    const datosForm = req.body
    const miNombre = req.body.nombre
    const miApellido = req.body.apellido
    const cargo = req.body.cargo
    res.status(200).json({Mensaje:"datos resibidos", nombre: miNombre, apellido : miApellido, cargo:cargo})
})

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${port}`)
});

