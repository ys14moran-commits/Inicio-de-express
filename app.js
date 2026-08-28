//const express = require("express")
import express from 'express';

//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 5050;
//uso de middleware body-parse
app.use(express.json())


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

app.post("/login", (req, res) => {

    const usuario = req.body.usuario
    const perfil = req.body.perfil
    const contraseña = req.body.contraseña

    // Validar si faltan datos
    if (!usuario, !perfil, !contraseña) {
        return res.status(400).json({
            mensaje: "Faltan datos. Debe enviar usuario, perfil y contraseña"
        })
    }

    // Validar el perfil
    if (perfil === "admin") {
        return res.status(200).json({
            mensaje: `Bienvenido ${usuario}, ha ingresado como administrador`
        })
    }

    if (perfil === "usuario") {
        return res.status(200).json({
            mensaje: `Bienvenido ${usuario}, ha ingresado como usuario`
        })
    }

    // Si el perfil no es válido
    return res.status(403).json({
        mensaje: "No tiene acceso. El perfil ingresado no es válido"
    })
})

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${port}`)
});

