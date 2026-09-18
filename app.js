const express = require ("express")
const app = express()
require("dotenv").config()
const puerto = process.env.PUERTO || 5000;
//configurar para la lectura del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")
//importal libreria para subir archivos
const multer = require("multer")
const jwt = require("jsonwebtoken")
const { validarAprendiz, generarId } = require("./utilidades/validacion");
//configuracion almacenamiento
const almacenamiento =multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "misImagenes/")
    },
    filename: (req, file, cb)=>{
        const extensionArchivo =ruta.extname(
            file.originalname
        )
        cb(null, `${Date.now()}${extensionArchivo}`)
    }
})

const subirArchivo = multer ({storage: almacenamiento})

//parte de los middleware
const registromiddeleware = require("./middleware/registromiddleware")
const manejadorErrores = require ("./middleware/manejadorErrores")
const autenticarMiddelware = require("./middleware/autenticarMiddleware")

app.use(registromiddeleware)


app.use((req, res, next)=>{
    console.log(`tiempo milisegundos: ${Date.now()}`)
    console.log(`fecha: ${new Date().toISOString()}`)
    next()
})

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

//enpoint para modificar
app.put("/api/aprendices/:id", (req, res) =>{
    res.status(200).json({mensaje: "Enpoint en construccion de modificar"})
})


app.delete("/api/aprendices/:id", (req, res)=>{
    res.status(200).json({mensaje:"Enpoint en contrucion de eliminar"})
} )

//validar que se envien los datos
app.post("/api/aprendices", subirArchivo.single("imagen"), (req, res) => {

    const nuevoAprendiz = req.body;

    // Validar aprendiz
    const errorValidacion = validarAprendiz(nuevoAprendiz);

    if (errorValidacion) {
        return res.status(400).json({
            Error: errorValidacion
        });
    }

    // Generar ID automático
    nuevoAprendiz.id = generarId();

    // Guardar imagen
    nuevoAprendiz.imagen = req.file
        ? `/misImagenes/${req.file.filename}`
        : "sin imagen";
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

//provocar error
app.get("/error", (req,res,next)=>{
    next(new Error("eRROR intencional para probar"))
})

//ruta protegida
app.get("/rutaprotegida", autenticarMiddelware, (req, res)=>{
    res.json({mensaje: "Estarura esta protegida."})
})


//endpoint iniciar secion, generar token
app.post("/login", (req, res)=>{
    //capturar usario de base datos
    const {usuario, clave} = req.body
    const usuarioBd = {"user": "yahir", "clave": "hola123"}
    //verificar datos
    if(usuario !== usuarioBd.user || clave !== usuarioBd.clave){
        res.json({mensaje: "Credenciales incorrrectas"})
    }
    //GENERAR EL TOKEN
    const token = jwt.sing(
        {usuario: usuario},
        process.env.JWT_SECRETO,
        {expireIn: "2h"}
    )
    res.json({token: token})

})

//uso del middelware de errore
app.use(manejadorErrores)


app.listen(puerto, function(){
    console.log(`Servidor corriendo exitosamente en el puerto http://localhost:${puerto}`);
    
}); 