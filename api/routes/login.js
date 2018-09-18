const $express = require('express');
const $router = $express.Router();

const $login_controller = require('../controllers/login_controller');

//Handling Post Request To Login
$router.post('/', $login_controller.post);





module.exports = $router;