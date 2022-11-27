
const express = require('express');
const rutas = express.Router();

//importar modelo de la BD.
const Estud = require('../modelos/estudiante');


//FUNCION MIDDELWARE
//funcion editar
rutas.use( function(req,res, next){
    if(req.query._method=='PUT'){
        req.method='PUT';
        req.url = req.path;
    }
    next();
})

//funcion eliminar
rutas.use( function(req,res,next){
    if(req.query._method=='DELETE'){
        req.method='DELETE';
        req.url = req.path;
    }
    next();
})

rutas.put('/estudiantes/:id', async(req,res,next) =>{
    console.log("Este es el metodo PUT");
    const id = req.params.id;
    const estudiante = await Estud.findOne({id:id});
    await Estud.updateOne( {id:id}, {$set:{aprobado: !estudiante.aprobado}})
    console.log(id);
    res.render('hola', {listaEstudiantes: await Estud.find(), estudiante: {}});
})


rutas.delete('/estudiantes/:id', async(req,res,next) => {
    console.log("Este es el verdadero DELETE");
    const id = req.params.id;
    await Estud.deleteOne({id:id})
    console.log(id);
    res.redirect('/');
})

//Buscar estudiante
rutas.get('/estudiantes', async(req,res) =>{
    //console.log("Este es el get");
    const id = req.query.id;
    const estudiante = await Estud.findOne({id:id});
    console.log(estudiante);

    res.render('hola', {listaEstudiantes: await Estud.find(), estudiante})
})

//Declaración del endpoint default.
//Renderizar y enviar la lista de estudiantes.
rutas.get('/', async(req,res)=>{
    //res.send("Hola desde la ruta GET /");
    const estudiante = {}
    const listaEstudiantes = await Estud.find();
    //console.log(listaEstudiantes);
    res.render("hola.ejs", {listaEstudiantes, estudiante});
});

//Insertar estudiante
rutas.post('/estudiantes', async(req,res) => {
    var e = new Estud(req.body);
    await Estud.insertMany(e);
    res.redirect('/');
});

//Exportando las rutas.
module.exports = rutas;



