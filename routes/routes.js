const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');
const veiculosController = require('../controllers/veiculos');
const servicosController = require('../controllers/servicos');
const disponibilidadeController = require('../controllers/disponibilidade'); // Importa o controlador de disponibilidade
const indisponibilidadeController = require('../controllers/indisponibilidade'); // Importa o controlador de indisponibilidade
const veiculoUsuarioController = require('../controllers/veiculoUsuario'); // Importa o controlador de veiculoUsuario
const agendaServicosController = require('../controllers/agendaServicos'); // Importa o controlador de agendaServicos
const agendaServicosSituacaoController = require('../controllers/agendaServicosSituacao'); // Importa o controlador de agendaServicosSituacao

// Rotas para operações relacionadas a usuários
router.get('/usuarios', usuariosController.listarUsuarios); // GET para listar todos os usuários
router.post('/usuarios', usuariosController.cadastrarUsuarios); // POST para cadastrar um novo usuário
router.patch('/usuarios/:usu_id', usuariosController.editarUsuarios); // PATCH para editar um usuário específico
router.delete('/usuarios/:usu_id', usuariosController.excluirUsuarios); // DELETE para apagar um usuário específico
router.patch('/usuarios/ocultar/:usu_id', usuariosController.ocultarUsuario); // PATCH para ocultar um usuário específico
// router.put('/usuarios/:usu_id', usuariosController.editarUsuarios); // PUT para editar um usuário específico

// Rota para operação de login de usuário
router.post('/login', usuariosController.login); // POST para realizar o login de um usuário

// Rotas para operações relacionadas a veículos
router.get('/veiculos', veiculosController.listarVeiculos); // GET para listar todos os veículos
router.post('/veiculos', veiculosController.cadastrarVeiculo); // POST para cadastrar um novo veículo
router.patch('/veiculos/:veic_id', veiculosController.editarVeiculo); // PATCH para editar um veículo específico
router.delete('/veiculos/:veic_id', veiculosController.excluirVeiculo); // DELETE para apagar um veículo específico
router.patch('/veiculos/ocultar/:veic_id', veiculosController.ocultarVeiculo); // PATCH para ocultar um veículo específico
// router.put('/veiculos/:veic_id', veiculosController.editarVeiculo); // PUT para editar um veículo específico

// Rotas para operações relacionadas a serviços
router.get('/servicos', servicosController.listarServicos); // GET para listar todos os serviços
router.post('/servicos', servicosController.cadastrarServico); // POST para cadastrar um novo serviço
router.patch('/servicos/:serv_id', servicosController.editarServico); // PUT para editar um serviço específico
router.delete('/servicos/:serv_id', servicosController.apagarServico); // DELETE para apagar um serviço específico
router.patch('/servicos/ocultar/:serv_id', servicosController.ocultarServico); // PATCH para ocultar um serviço específico
// router.put('/servicos/:serv_id', servicosController.editarServico); // PUT para editar um serviço específico

// Rotas para operações relacionadas a disponibilidade
router.get('/disponibilidade', disponibilidadeController.listarDisponibilidade); // GET para listar todas as disponibilidades
router.post('/disponibilidade', disponibilidadeController.cadastrarDisponibilidade); // POST para cadastrar uma nova disponibilidade
router.patch('/disponibilidade/:disp_id', disponibilidadeController.editarDisponibilidade); // PATCH para editar uma disponibilidade específica
router.delete('/disponibilidade/:disp_id', disponibilidadeController.excluirDisponibilidade); // DELETE para apagar uma disponibilidade específica
router.patch('/disponibilidade/desabilitar/:disp_id', disponibilidadeController.desabilitarDisponibilidade); // PATCH para desabilitar disponibilidades
// router.put('/disponibilidade/:disp_id', disponibilidadeController.editarDisponibilidade); // PUT para editar uma disponibilidade específica

// Rotas para operações relacionadas a indisponibilidade
router.get('/indisponibilidade', indisponibilidadeController.listarIndisponibilidade); // GET para listar todas as indisponibilidades
router.post('/indisponibilidade', indisponibilidadeController.cadastrarIndisponibilidade); // POST para cadastrar uma nova indisponibilidade
router.patch('/indisponibilidade/:indisp_id', indisponibilidadeController.editarIndisponibilidade); // PATCH para editar uma indisponibilidade específica
router.delete('/indisponibilidade/:indisp_id', indisponibilidadeController.excluirIndisponibilidade); // DELETE para apagar uma indisponibilidade específica
router.patch('/indisponibilidade/desabilitar/:indisp_id', indisponibilidadeController.desabilitarIndisponibilidade); // PATCH para desabilitar indisponibilidades
// router.put('/indisponibilidade/:indisp_id', indisponibilidadeController.editarIndisponibilidade); // PUT para editar uma indisponibilidade específica

// Rotas para operações relacionadas a veiculoUsuario/veiculoUsuario
router.get('/veiculoUsuario', veiculoUsuarioController.listarVeiculosUsuario); // GET para listar todas as relações veiculoUsuario/veiculoUsuario
router.post('/veiculoUsuario', veiculoUsuarioController.cadastrarVeiculoUsuario); // POST para cadastrar uma nova relação veiculoUsuario/veiculoUsuario
router.patch('/veiculoUsuario/:veic_usu_id', veiculoUsuarioController.editarVeiculoUsuario); // PATCH para editar uma relação veiculoUsuario/veiculoUsuario específica
router.delete('/veiculoUsuario/:veic_usu_id', veiculoUsuarioController.excluirVeiculoUsuario); // DELETE para apagar uma relação veiculoUsuario/veiculoUsuario específica

// Rotas para operações relacionadas a agendaServicos
router.get('/agendaServicos', agendaServicosController.listarAgendaServicos); // GET para listar todos os serviços agendados
router.post('/agendaServicos', agendaServicosController.cadastrarAgendaServico); // POST para cadastrar um novo serviço agendado
router.patch('/agendaServicos/:agend_serv_id', agendaServicosController.editarAgendaServico); // PATCH para editar um serviço agendado específico
router.delete('/agendaServicos/:agend_serv_id', agendaServicosController.excluirAgendaServico); // DELETE para apagar um serviço agendado específico

// Rotas para operações relacionadas a agendaServicosSituacao
router.get('/agendaServicosSituacao', agendaServicosSituacaoController.listarSituacoes); // GET para listar todas as situações de serviços agendados
router.post('/agendaServicosSituacao', agendaServicosSituacaoController.cadastrarSituacao); // POST para cadastrar uma nova situação de serviço agendado
router.patch('/agendaServicosSituacao/:agend_serv_situ_id', agendaServicosSituacaoController.editarSituacao); // PATCH para editar uma situação de serviço agendado específica
router.delete('/agendaServicosSituacao/:agend_serv_situ_id', agendaServicosSituacaoController.excluirSituacao); // DELETE para apagar uma situação de serviço agendado específica

module.exports = router;
