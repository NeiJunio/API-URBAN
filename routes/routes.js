const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const router = express.Router();

router.get('/usuarios', UsuarioController.listarUsuarios);
router.post('/usuarios', UsuarioController.cadastrarUsuarios);
router.put('/usuarios/:usu_id', UsuarioController.editarUsuarios);
router.delete('/usuarios/:usu_id', UsuarioController.apagarUsuarios);
router.patch('/usuarios/:usu_id/ocultar', UsuarioController.ocultarUsuario);
router.post('/login', UsuarioController.login);

module.exports = router;
