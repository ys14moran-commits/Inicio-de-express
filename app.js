//const express = require("express")
import express from 'express';

//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 5050;

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

app.get ("/ruta3/:aprendiz", (req, res)=>{
    const dato_aprendiz = req.params.aprendiz
    res.json({"nombre": dato_aprendiz})
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${port}`)
});

