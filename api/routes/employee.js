const $express = require('express');
const $router = $express.Router();

const $checkAuth = require('../middelware/auth');
const $employee_controller = require('../controllers/employee_controller');

//Posting To The DataBase
$router.post('/', $checkAuth, $employee_controller.post);

//Handling Get Request To Get All Of The Data
$router.get('/', $checkAuth, $employee_controller.getAll);

//Handling Get Request To Get The Unique Data
$router.get('/:id', $checkAuth, $employee_controller.getUnique);

//Handling Delete Request
$router.delete('/:id', $checkAuth, $employee_controller.delete);

//Handling Patch Request
$router.patch('/:id', $checkAuth, $employee_controller.patch);




module.exports = $router;