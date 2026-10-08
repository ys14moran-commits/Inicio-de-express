const miApp = require("./app")
const PUERTO = process.env.PUERTO || 3000

miApp.listen(PUERTO, () =>{
    console.log(`Servgidor corriendo en: http://localhost:${PUERTO} `)
})
