const db = require('../database/connection');

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
                usu_acesso 
                FROM usuarios 
                WHERE usu_acesso = 0;`;

            const [usuarios] = await db.query(sql);
            const nItens = usuarios.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários.',
                dados: usuarios,
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
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
                usu_senha
            } = request.body;

            const sql = `INSERT INTO usuarios 
                (usu_nome, usu_cpf, usu_data_nasc, usu_sexo, usu_telefone, 
                usu_email, usu_observ, usu_acesso, usu_senha) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                usu_nome,
                usu_cpf,
                usu_data_nasc,
                usu_sexo,
                usu_telefone,
                usu_email,
                usu_observ,
                usu_acesso,
                usu_senha
            ];

            const [execSql] = await db.query(sql, values);
            const usu_id = execSql.insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de usuário efetuado com sucesso.',
                dados: usu_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
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
                usu_senha
            } = request.body;

            const { usu_id } = request.params;

            const sql = `UPDATE usuarios SET 
                usu_nome = ?, 
                usu_cpf = ?, 
                usu_data_nasc = ?, 
                usu_sexo = ?, 
                usu_telefone = ?, 
                usu_email = ?, 
                usu_observ = ?, 
                usu_acesso = ?, 
                usu_senha = ? 
                WHERE usu_id = ?;`;

            const values = [
                usu_nome,
                usu_cpf,
                usu_data_nasc,
                usu_sexo,
                usu_telefone,
                usu_email,
                usu_observ,
                usu_acesso,
                usu_senha,
                usu_id
            ];

            const [atualizaDados] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} atualizado com sucesso!`,
                dados: atualizaDados.affectedRows
            });
        } catch (error) {
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
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async ocultarUsuario(request, response) {
        try {
            const usu_acesso = 0;
            const { usu_id } = request.params;
            const sql = `UPDATE usuarios SET usu_acesso = ? WHERE usu_id = ?;`;
            const values = [usu_acesso, usu_id];
            const [atualizacao] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} ocultado com sucesso`,
                dados: atualizacao.affectedRows
            });
        } catch (error) {
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
            const sql = `SELECT usu_id, usu_nome FROM usuarios 
                WHERE usu_email = ? AND usu_senha = ? AND usu_acesso = 1;`;
            const values = [usu_email, usu_senha];
            const [usuarios] = await db.query(sql, values);
            const nItens = usuarios.length;

            if (nItens < 1) {
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
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
}
