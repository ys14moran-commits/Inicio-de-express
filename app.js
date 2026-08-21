const express = require ("express");
const app = express();
require("dotenv/config")
const puerto = process.env.PUERTO || 3000;

app.get("/", function(req, res){
    res.send("Api - rest aprendices");
});

app.listen(puerto, function(){
     console.log(`Servidor corriendo exitosamente en el puerto http://localhost:${puerto}`);
    
}); 