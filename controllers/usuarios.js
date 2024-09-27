const db = require('../database/connection');
const moment = require('moment');

const dataInput = (data) => {
    const dataInput = moment(data, 'YYYY-MM-DD').format('YYYY-MM-DD'); 
    return dataInput;
}

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const sql = `SELECT 
                usu_id, 
                usu_nome, 
                usu_cpf, 
                usu_data_nasc, 
                usu_sexo, 
                usu_telefone, 
                usu_email, 
                usu_observ, 
                usu_acesso,
                usu_senha,
                usu_situacao
                FROM usuarios`;

            const [usuarios] = await db.query(sql);
            const nItens = usuarios.length;

            const usuariosFormatados = usuarios.map(usuario => ({
                ...usuario,
                usu_data_nasc: dataInput(usuario.usu_data_nasc)
            }));

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários.',
                dados: usuariosFormatados,
                nItens
            });
        } catch (error) {
            console.error('Erro em listarUsuarios:', error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async verificarCpf(request, response) {
        try {
            const { usu_cpf } = request.body;
            console.log("Recebido verificarCpf:", request.body); // Log dos dados recebidos

            if (!usu_cpf) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF é obrigatório.',
                    dados: null
                });
            }

            const sql = `SELECT usu_id FROM usuarios WHERE usu_cpf = ?`;
            const [result] = await db.query(sql, [usu_cpf]);
            console.log("Resultado da consulta verificarCpf:", result); // Log do resultado da consulta

            if (result.length > 0) {
                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'CPF já cadastrado.',
                    dados: result[0]
                });
            } else {
                return response.status(200).json({
                    sucesso: false,
                    mensagem: 'CPF não encontrado.',
                    dados: null
                });
            }
        } catch (error) {
            console.error('Erro em verificarCpf:', error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na verificação do CPF.',
                dados: error.message
            });
        }
    },

    async cadastrarUsuarios(request, response) {
        try {
            const {
                usu_nome,
                usu_cpf,
                usu_data_nasc,
                usu_sexo,
                usu_telefone,
                usu_email,
                usu_observ,
                usu_acesso,
                usu_senha,
                usu_situacao
            } = request.body;
    
            // Verifica se o CPF foi fornecido
            if (!usu_cpf) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF é obrigatório.',
                    dados: null
                });
            }
    
            // Verifica se o CPF já está cadastrado
            const sqlVerificaCpf = `SELECT usu_id FROM usuarios WHERE usu_cpf = ?`;
            const [cpfExistente] = await db.query(sqlVerificaCpf, [usu_cpf]);
    
            console.log("Resultado da verificação do CPF:", cpfExistente); // Log do resultado da verificação
    
            if (cpfExistente.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'CPF já cadastrado. Não é possível cadastrar novamente.',
                });
            }
    
            // Se o CPF não está cadastrado, prossegue com o cadastro
            const sql = `INSERT INTO usuarios 
                (usu_nome, usu_cpf, usu_data_nasc, usu_sexo, usu_telefone, 
                usu_email, usu_observ, usu_acesso, usu_senha, usu_situacao) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
            const values = [
                usu_nome,
                usu_cpf,
                dataInput(usu_data_nasc), // Verifique se a data está no formato correto
                usu_sexo,
                usu_telefone,
                usu_email,
                usu_observ,
                usu_acesso,
                usu_senha,
                usu_situacao
            ];
    
            console.log("Valores a serem inseridos:", values); // Log dos valores que serão inseridos
    
            const [execSql] = await db.query(sql, values);
            const usu_id = execSql.insertId;
    
            console.log("Usuário cadastrado com ID:", usu_id); // Log do ID do novo usuário
    
            return response.status(201).json({
                sucesso: true,
                mensagem: 'Cadastro de usuário efetuado com sucesso.',
                dados: { usu_id } // Retornando o ID do novo usuário
            });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error); // Log do erro
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
,    
    

    async editarUsuarios(request, response) {
        try {
            const {
                usu_nome,
                usu_cpf,
                usu_data_nasc,
                usu_sexo,
                usu_telefone,
                usu_email,
                usu_observ,
                usu_acesso,
            } = request.body;

            const { usu_id } = request.params;

            // Logging received data for debugging
            console.log(`Recebido editarUsuarios para usu_id ${usu_id}:`, request.body);

            // Validate required fields
            if (!usu_nome || !usu_cpf || !usu_data_nasc || !usu_sexo || !usu_telefone || !usu_email) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Campos obrigatórios não preenchidos.',
                });
            }

            const sql = `UPDATE usuarios SET 
                usu_nome = ?, 
                usu_cpf = ?, 
                usu_data_nasc = ?, 
                usu_sexo = ?, 
                usu_telefone = ?, 
                usu_email = ?, 
                usu_observ = ?, 
                usu_acesso = ?                
                WHERE usu_id = ?;`;

            const values = [
                usu_nome,
                usu_cpf,
                dataInput(usu_data_nasc),
                usu_sexo,
                usu_telefone,
                usu_email,
                usu_observ || null, // Allow observ to be null if not provided
                usu_acesso,
                usu_id
            ];

            const [atualizaDados] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} atualizado com sucesso!`,
                dados: atualizaDados.affectedRows
            });
        } catch (error) {
            console.error('Erro em editarUsuarios:', error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async excluirUsuarios(request, response) {
        try {
            const { usu_id } = request.params;
            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            const values = [usu_id];
            const [excluir] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} excluído com sucesso`,
                dados: excluir.affectedRows
            });
        } catch (error) {
            console.error('Erro em excluirUsuarios:', error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async ocultarUsuario(request, response) {
        try {
            const { usu_situacao } = request.body;
            const { usu_id } = request.params;

            const sql = `UPDATE usuarios SET usu_situacao = ? WHERE usu_id = ?;`;
            const values = [usu_situacao, usu_id];
            const [atualizacao] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} ${usu_situacao == 1 ? 'reativado' : 'desativado'} com sucesso`,
                dados: atualizacao.affectedRows
            });
        } catch (error) {
            console.error('Erro em ocultarUsuario:', error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async login(request, response) {
        try {
            const { usu_email, usu_senha } = request.body;

            const sql = `SELECT usu_id, usu_nome, usu_acesso FROM usuarios 
                WHERE usu_email = ? AND usu_senha = ? AND usu_situacao = 1;`;
                
            const values = [usu_email, usu_senha];
            const [usuarios] = await db.query(sql, values);

            if (usuarios.length < 1) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Login e/ou senha inválido.',
                    dados: null,
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados: usuarios[0]
            });
        } catch (error) {
            console.error('Erro em login:', error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
};
