const $express = require('express');
const $router = $express.Router();

const $checkAuth = require('../middelware/auth');
const $signup_controller = require('../controllers/signup_controller');

//Handling Post Request
$router.post('/', $signup_controller.post);

//Handling Get Request
$router.get('/', $checkAuth, $signup_controller.getAll);

//Handling Get Request To Get The Unique
$router.get('/:id', $checkAuth, $signup_controller.getUnique);

//Handling Delete Request
$router.delete('/:id', $checkAuth, $signup_controller.delete);

//Handling Patch Request
$router.patch('/:id', $checkAuth, $signup_controller.patch);




module.exports = $router;