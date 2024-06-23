-- Desabilitar a verificação de chaves estrangeiras temporariamente
SET FOREIGN_KEY_CHECKS = 0;

-- Dropar tabelas dependentes primeiro
DROP TABLE IF EXISTS `agenda_servicos`;
DROP TABLE IF EXISTS `agendamentos`;
DROP TABLE IF EXISTS `veiculo_usuario`;
DROP TABLE IF EXISTS `veiculos`;
DROP TABLE IF EXISTS `servicos`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `marcas`;
DROP TABLE IF EXISTS `modelos`;
DROP TABLE IF EXISTS `categorias`;
DROP TABLE IF EXISTS `disponibilidade`;
DROP TABLE IF EXISTS `indisponibilidade`;

-- Habilitar a verificação de chaves estrangeiras novamente
SET FOREIGN_KEY_CHECKS = 1;
