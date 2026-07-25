import express from "express"
const app = express();
const port = 3000;
app.get("/", function (req, res) {
res.send("Aprendiendo express,ficha 3407181 yahir santiago moran chiquiza");
});
app.listen(port, function () {
console.log( `Servidor en funcionamiento en el puerto: ${port}`);
});
