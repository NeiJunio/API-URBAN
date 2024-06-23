-- Criação da tabela 'veiculo'
CREATE TABLE veiculo (
    veiculo_cod INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_marca VARCHAR(50),
    veiculo_modelo VARCHAR(50),
    veiculo_placa VARCHAR(10)
);

-- Inserção de dados na tabela 'veiculo'
INSERT INTO veiculo (veiculo_marca, veiculo_modelo, veiculo_placa) VALUES
('Toyota', 'Corolla', 'ABC1234'),
('Honda', 'Civic', 'DEF5678'),
('Ford', 'Focus', 'GHI9012');

select * from veiculo

-- Criação da tabela 'usuario'
CREATE TABLE usuario (
    usuario_cod INT AUTO_INCREMENT PRIMARY KEY,
    usuario_nome VARCHAR(100),
    usuario_cpf VARCHAR(11),
    usuario_email VARCHAR(100)
);

select * from usuario

-- Inserção de dados na tabela 'usuario'
INSERT INTO usuario (usuario_nome, usuario_cpf, usuario_email) VALUES
('João Silva', '12345678901', 'joao.silva@example.com'),
('Maria Oliveira', '98765432109', 'maria.oliveira@example.com'),
('Pedro Santos', '56789012345', 'pedro.santos@example.com');

-- Criação da tabela 'veiculo_usuario'
CREATE TABLE veiculo_usuario (
    veiculo_usuario_cod INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_cod INT,
    usuario_cod INT,
    ehpropietario BOOLEAN,
    datainicial DATE,
    datafinal DATE,
    FOREIGN KEY (veiculo_cod) REFERENCES veiculo(veiculo_cod),
    FOREIGN KEY (usuario_cod) REFERENCES usuario(usuario_cod)
);

-- Inserção de dados na tabela 'veiculo_usuario'
INSERT INTO veiculo_usuario (veiculo_cod, usuario_cod, ehpropietario, datainicial, datafinal) VALUES
(1, 1, TRUE, '2023-01-01', NULL),
(2, 2, TRUE, '2023-02-01', '2023-12-31'),
(3, 3, TRUE, '2023-03-01', NULL),
(1, 2, FALSE, '2023-04-01', '2023-04-30');

   select * 
      from veiculo
      
      delete from veiculo where veiculo_cod = 1

    select vei.veiculo_cod,
		   veiculo_marca as Marca,
		   veiculo_modelo as modelo,
           veiculo_placa,
           usuario_nome,
           usuario_cpf,
           case 
             when ehpropietario = 1 then 'sim'
             else 'nao'
		   end as proprietario,
           case 
             when datafinal is null then 'ativo'
             else 'inativo'
		   end as situacao,
           datainicial,
           datafinal
      from veiculo_usuario AS vus
INNER JOIN veiculo         AS vei ON vus.veiculo_cod = vei.veiculo_cod
INNER JOIN usuario         AS usu ON vus.usuario_cod = usu.usuario_cod

select veiculo_marca as Marca,
		   veiculo_modelo as modelo,
           veiculo_placa,
           usuario_nome,
           usuario_cpf,
           case 
             when ehpropietario = 1 then 'sim'
             else 'nao'
		   end as proprietario,
           datainicial,
           datafinal
      from veiculo_usuario 
INNER JOIN veiculo         ON veiculo_usuario.veiculo_cod = veiculo.veiculo_cod
INNER JOIN usuario         ON veiculo_usuario.usuario_cod = usuario.usuario_cod
