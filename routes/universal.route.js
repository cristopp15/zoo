'use strict'

var express = require('express');
var universalController = require('../controllers/universal.controller');
var api = express.Router();

api.get('/listAnimals', universalController.listAnimals);
api.get('/getAnimal/:id', universalController.listAnimal);

module.exports = api;