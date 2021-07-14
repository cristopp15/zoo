'use strict'

var express = require('express');
var animalController = require('../controllers/animal.controller');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var connectMultiparty = require('connect-multiparty');
var mdUpload = connectMultiparty({ uploadDir: './uploads/animals'});

api.post('/saveAnimal', mdAuth.ensureAuthAdmin, animalController.saveAnimal);
api.delete('/deleteAnimal', mdAuth.ensureAuthAdmin, animalController.deleteAnimal)
api.put('/updateAnimal/:idU/:idA', mdAuth.ensureAuthAdmin, animalController.updateAnimal);
api.put('/uploadImage/:idU/:idA', [mdAuth.ensureAuthAdmin, mdUpload], animalController.uploadImage);
api.get('/getImage/:idU:/:idA/:image', [mdAuth.ensureAuthAdmin, mdUpload], animalController.getImage);


module.exports = api;
