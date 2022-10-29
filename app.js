
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));

//Conexion a la base de datos.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crud-proyecto').
then(db => console.log("Conectado a BD")).
catch(err => console.log("Error al conectarse a la BD"));

//Configurar vistas
app.set('views', __dirname + '/vistas');
app.set('view engine', 'ejs');

//Configurar las rutas
const indiceRutas = require('./rutas/index');
app.use('/', indiceRutas);

app.listen(3000, () => {
    console.log("servidor en puerto 3000");
});
