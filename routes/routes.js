const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuarios');
const veiculosController = require('../controllers/veiculos');
const servicosController = require('../controllers/servicos');


// Rotas para operações relacionadas a usuários
router.get('/usuarios', UsuariosController.listarUsuarios); // GET para listar todos os usuários
router.post('/usuarios', UsuariosController.cadastrarUsuarios); // POST para cadastrar um novo usuário
router.patch('/usuarios/:usu_id', UsuariosController.editarUsuarios); // PUT para editar um usuário específico
router.delete('/usuarios/:usu_id', UsuariosController.excluirUsuarios); // DELETE para apagar um usuário específico
// router.put('/usuarios/:usu_id', UsuariosController.editarUsuarios); // PUT para editar um usuário específico
// router.patch('/usuarios/oculta/:usu_id', UsuariosController.ocultarUsuario); // PATCH para ocultar um usuário específico

// Rota para operação de login de usuário
router.post('/login', UsuariosController.login); // POST para realizar o login de um usuário

// Rotas para operações relacionadas a veículos
router.get('/veiculos', veiculosController.listarVeiculos); // GET para listar todos os veículos
router.post('/veiculos', veiculosController.cadastrarVeiculo); // POST para cadastrar um novo veículo
router.patch('/veiculos/:veic_id', veiculosController.editarVeiculo); // PUT para editar um veículo específico
router.delete('/veiculos/:veic_id', veiculosController.excluirVeiculo); // DELETE para apagar um veículo específico
// router.put('/veiculos/:veic_id', veiculosController.editarVeiculo); // PUT para editar um veículo específico
// router.patch('/veiculos/ocultar/:veic_id', veiculosController.ocultarVeiculo); // PATCH para ocultar um veículo específico

// Rotas para operações relacionadas a serviços
router.get('/servicos', servicosController.listarServicos); // GET para listar todos os serviços
router.post('/servicos', servicosController.cadastrarServico); // POST para cadastrar um novo serviço
router.patch('/servicos/:serv_id', servicosController.editarServico); // PUT para editar um serviço específico
router.delete('/servicos/:serv_id', servicosController.apagarServico); // DELETE para apagar um serviço específico
// router.put('/servicos/:serv_id', servicosController.editarServico); // PUT para editar um serviço específico
// router.patch('/servicos/ocultar/:serv_id', servicosController.ocultarServico); // PATCH para ocultar um serviço específico


module.exports = router;
