'use strict'

var Animal = require('../models/animal.model');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
/*
function saveAnimal(req, res){
    
    var userId = req.params.idU;
    var animal = new Animal();
    var params = req.body;

    if(params.name && params.nickName && params.age && params.carer){
            Animal.findOne({carer: user.carer}, (err, carerFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general 2'});
                }else if (carerFind){
                    res.send({message:"Cuidador ya asignado"});
                }else{
                    animal.name = params.name;
                    animal.nickName = params.nickName;
                    animal.age = params.age;
                    animal.carer = params.carer;

                    animal.save((err, animalSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general 3'});
                        }else if(animalSaved){
                            res.send({message: 'Animal guardado exitosamente', animal : animalSaved});
                        }else{
                            res.status(418).send({message: 'Error al guardar'});
                        }
                    })
                }

            })




    }else {
        res.send({message: 'Ingrese todos los campos necesarios'});
    }
}*/


function saveAnimal(req, res){
    var animal = new Animal();
    var params = req.body;

    if(params.name && 
        params.nickName && 
        params.age &&
        params.carer  ){
                    animal.name = params.name;
                    animal.nickName = params.nickName;
                    animal.age = params.age;
                    animal.carer = params.carer;
                    
                    animal.save((err, animalSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general'});
                        }else if(animalSaved){
                            res.send({message: 'Animal guardado con exito', animal: animalSaved});
                        }else{
                            res.status(418).send({message: 'Error al guardar'});
                        }
                    })
    }else {
        res.send({message: 'Ingrese todos los campos necesarios'});
    }

}

function updateAnimal(req, res){
    var userId = req.params.idU;
    var animalId = req.params.idA;
    var update = req.body;

        Animal.findByIdAndUpdate(animalId, update, {new:true}, (err,animalUpdated)=>{
            if(err){
                res.status(500).send({message:'Error general'});
            }else if(animalUpdated){
                res.send({message:'Animal actualizado:', animal: animalUpdated});
            }else{
                res.status(418).send({message:'Error al actualizar animal'});
            }
        }).populate('user');


}

function deleteAnimal(req,res){
    var userId = req.params.idU;
    var animalId = req.params.idA;

   
        Animal.findByIdAndRemove(animalId, (err,animalDeleted)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(animalDeleted){
                res.send({message: 'Animal eliminado'});
            }else{
                res.status(418).send({message: 'Error al eliminar'});
            }

        })
    
}

function uploadImage(req, res){
    var userId = req.params.idU;
    var animalId = req.params.idA;
    var fileName = 'No subido';

      
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[2];
    
            var ext = fileName.split('\.');
            var fileExt = ext[1];

            if( fileExt == 'png' ||
                fileExt == 'jpg' ||
                fileExt == 'jpeg' ||
                fileExt == 'gif'){
                    Animal.findByIdAndUpdate(animalId, 
                        {image: fileName}, 
                        {new: true},
                        (err, animalUpdated)=>{
                            if(err){
                                res.status(500).send({message: ' Error general al actualizar'});
                            }else if(animalUpdated){
                                res.send({animal: animalUpdated, image: animalUpdated.image});
                            }else{
                                res.status(418).send({message: 'No se ha podido actualizar'});
                            }
                        }).populate('user');
            }else{
                fs.unlink(filePath, (err)=>{
                    if(err){
                        res.status(418).send({message: 'Extensión de archivo no admitida, y archivo no eliminado'});
                    }else{
                        res.send({message: 'Extensión de archivo no admitida'});
                    }
                });
            }
            }else{
            res.status(404).send({message: 'No has subido una imagen'});
        }
 }


function getImage(req,  res){
    var userId = req.params.idU;
    var animalId = req.params.idA;
    var fileName = req.params.image;
    var pathFile = './uploads/animals/'+fileName;

    fs.exists(pathFile, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message: 'Imagen inexistente'});
        }
    });
}


module.exports = {
    saveAnimal,
    updateAnimal,
    uploadImage,
    deleteAnimal,
    getImage
}