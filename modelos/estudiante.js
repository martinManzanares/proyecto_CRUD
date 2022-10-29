
const mongoose = require('mongoose');
const esquema = mongoose.Schema;


const estudianteEsquema = new esquema({
    id: String,
    nombre: String,
    aprobado: {
        type:Boolean,
        default:false
    }
});



module.exports = mongoose.model('estudiantes', estudianteEsquema);
                                // estudiantes es el nombre de la coleccion de la BD.