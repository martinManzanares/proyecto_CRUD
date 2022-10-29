
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
    const id = req.params.id;
    await Estud.updateOne( {id:id}, {$set:{aprobado:true}});
    res.redirect('/');
})


rutas.delete('/estudiantes/:id', async(req,res,next) => {
    //console.log("Este es el verdadero DELETE");
    const id = req.params.id;
    await Estud.deleteOne({id:id})
    console.log(id);
    res.redirect('/');
})

//Declaración del endpoint default.
//Renderizar y enviar la lista de estudiantes.
rutas.get('/', async(req,res)=>{
    //res.send("Hola desde la ruta GET /");
    const listaEstudiantes = await Estud.find();
    //console.log(listaEstudiantes);
    res.render("hola.ejs", {listaEstudiantes});
});

//PENDIENTE PORQUE TODAVIA NO FUNCIONA.
//Buscar estudiante
rutas.get('/estudiantes/:id', async(req,res) =>{
    //console.log("Este es el get");
    const id = req.params.id;
    const estudiante = await Estud.findOne({id:id});
    console.log(estudiante);
    res.redirect('/');
})


//Insertar estudiante
rutas.post('/estudiantes', async(req,res) => {
    var e = new Estud(req.body);
    await Estud.insertMany(e);
    res.redirect('/');
});

//Exportando las rutas.
module.exports = rutas;



