function validarAprendiz(aprendiz) {

    // Validar nombre
    if (!aprendiz.nombre || aprendiz.nombre.length < 3) {
        return "El nombre debe tener mínimo 3 letras";
    }

    // Validar correo
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!aprendiz.correo || !expresionCorreo.test(aprendiz.correo)) {
        return "El correo electrónico no es válido";
    }

    return null;
}


// Generar ID automático
function generarId() {
    return Date.now();
}


// Exportar las funciones
module.exports = {
    validarAprendiz,
    generarId
};