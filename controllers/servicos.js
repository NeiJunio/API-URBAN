const db = require('../database/connection');

module.exports = {
    async listarServicos(request, response) {
        try {
            const sql = `SELECT 
                serv_id, 
                cat_serv_id, 
                serv_nome, 
                serv_duracao, 
                serv_preco, 
                serv_descricao, 
                serv_situacao 
                FROM servicos WHERE serv_situacao = '1'`;

            const [servicos] = await db.query(sql);
            const nItens = servicos.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de serviços.',
                dados: servicos,
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
    async cadastrarServico(request, response) {
        try {
            const {
                cat_serv_id,
                serv_nome,
                serv_duracao,
                serv_preco,
                serv_descricao,
                serv_situacao
            } = request.body;

            const sql = `INSERT INTO servicos 
                (cat_serv_id, serv_nome, serv_duracao, serv_preco, serv_descricao, serv_situacao) 
                VALUES (?, ?, ?, ?, ?, ?)`;

            const values = [
                cat_serv_id,
                serv_nome,
                serv_duracao,
                serv_preco,
                serv_descricao,
                serv_situacao
            ];

            const [execSql] = await db.query(sql, values);
            const serv_id = execSql.insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de serviço efetuado com sucesso.',
                dados: serv_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarServico(request, response) {
        try {
            const {
                cat_serv_id,
                serv_nome,
                serv_duracao,
                serv_preco,
                serv_descricao,
                serv_situacao
            } = request.body;

            const { serv_id } = request.params;

            const sql = `UPDATE servicos SET 
                cat_serv_id = ?, 
                serv_nome = ?, 
                serv_duracao = ?, 
                serv_preco = ?, 
                serv_descricao = ?, 
                serv_situacao = ? 
                WHERE serv_id = ?;`;

            const values = [
                cat_serv_id,
                serv_nome,
                serv_duracao,
                serv_preco,
                serv_descricao,
                serv_situacao,
                serv_id
            ];

            const [atualizaDados] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Serviço ${serv_id} atualizado com sucesso!`,
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
    async apagarServico(request, response) {
        try {
            const { serv_id } = request.params;
            const sql = `DELETE FROM servicos WHERE serv_id = ?`;
            const values = [serv_id];
            const [excluir] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Serviço ${serv_id} excluído com sucesso`,
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
    async ocultarServico(request, response) {
        try {

            const {
                serv_situacao
            } = request.body;

            const { serv_id } = request.params;
            const sql = `UPDATE servicos SET serv_situacao = ? WHERE serv_id = ?;`;
            const values = [serv_situacao, serv_id];
            const [atualizacao] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                // mensagem: `Serviço ${serv_id} ${serv_situacao == 1 ? 'reativado' : 'desativado'} com sucesso`,
                mensagem: serv_situacao == 1 ? 1 : 0, // 1 pra reativado e 0 pra desativado
                dados: atualizacao.affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
}
