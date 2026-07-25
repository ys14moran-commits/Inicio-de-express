import express from "express"
const app = express();
const port = 3000;
app.get("/", function (req, res) {
res.send("Aprendiendo express,ficha 3407181 yahir santiago moran chiquiza");
});
app.listen(port, function () {
console.log( `Servidor en funcionamiento en el puerto: ${port}`);
});

import express from "express"
const app = express();
const port = process.env.PUERTO || 3000
app.get("/", function(req, res) {
res.send("Hola aprendiendo express, con la ficha 3407181, ADSO en el SENA");
});
app.listen(port, function() {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});