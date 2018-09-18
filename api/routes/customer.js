const $express = require('express');
const $router = $express.Router();

const $checkAuth = require('../middelware/auth');
const $customer_controller = require('../controllers/customer_controller');

//Handling Post Request
$router.post('/', $checkAuth, $customer_controller.post);

//Handling Get Request 
$router.get('/', $checkAuth, $customer_controller.getAll);

//Handling Get Request To Get Unique Data
$router.get('/:id', $checkAuth, $customer_controller.getUnique);

//Handling Delete Request
$router.delete('/:id', $checkAuth, $customer_controller.delete);

//Handling Patch Request
$router.patch('/:id', $checkAuth, $customer_controller.patch);





module.exports = $router;