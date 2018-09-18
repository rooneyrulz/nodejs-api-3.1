const $express = require('express');
const $router = $express.Router();

const $checkAuth = require('../middelware/auth');
const $department_controller = require('../controllers/department_controller');

//Handling Post Request
$router.post('/', $checkAuth, $department_controller.post);

//Handling Get Request To Get Back All The Data
$router.get('/', $checkAuth, $department_controller.getAll);

//Handling Get Request To Get The Unique Data
$router.get('/:id', $checkAuth, $department_controller.getUnique);

//Handling Delete Request
$router.delete('/:id', $checkAuth, $department_controller.delete);

//Handling Patch Request
$router.patch('/:id', $checkAuth, $department_controller.patch);


module.exports = $router;