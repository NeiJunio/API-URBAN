const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuarios');
const veiculoController = require('../controllers/veiculos');

router.get('/usuarios', UsuariosController.listarUsuarios);
router.post('/usuarios', UsuariosController.cadastrarUsuarios);
router.put('/usuarios/:usu_id', UsuariosController.editarUsuarios);
router.delete('/usuarios/:usu_id', UsuariosController.apagarUsuarios);
router.patch('/usuarios/:usu_id/ocultar', UsuariosController.ocultarUsuario);
router.post('/login', UsuariosController.login);

router.get('/veiculos', veiculoController.listarVeiculos);
router.post('/veiculos', veiculoController.cadastrarVeiculo);
router.put('/veiculos/:veic_id', veiculoController.editarVeiculo);
router.delete('/veiculos/:veic_id', veiculoController.apagarVeiculo);
router.patch('/veiculos/ocultar/:veic_id', veiculoController.ocultarVeiculo);

module.exports = router;
