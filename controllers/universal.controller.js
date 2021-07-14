'use strict'

var Animal = require('../models/animal.model');
var User = require('../models/user.model');

function listAnimals(req, res){
    Animal.find({}, (err, animals)=>{
        if(err){
            res.status(500).send({message : 'Error general'});
        }else if(animals){
            res.send({animals});
        }else{
            res.status(418).send({message: 'Sin datos que mostrar'});
        }
    })
}

function listAnimal(req,res){
    var animalId = req.params.id;

    Animal.findById({animalId},(err, animalFind)=>{
        if(err){
            res.status(500).send({message: 'Error general', err});
        }else if(animalFind){
            res.send({message: 'Animal encontrado:',animalFind});
        }else{
            res.status(404).send({message: 'No hay registro', err})
        }
    })
}

module.exports = {
    listAnimals,
    listAnimal
}