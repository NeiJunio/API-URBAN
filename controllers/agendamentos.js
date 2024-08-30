const db = require('../database/connection');

module.exports = {
    async listarAgendamentos(request, response) {
        try {
            const sql = `SELECT 
                agend_id,
                veic_usu_id,
                agend_data,
                agend_horario,
                agend_situacao,
                agend_observ
                FROM agendamentos`;

            const [agendamentos] = await db.query(sql);
            const nItens = agendamentos.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de agendamentos.',
                dados: agendamentos,
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

    async listarAgendamentosPorSituacao(request, response) {
        try {
            const { agend_situacao } = request.params;

            const sql = `SELECT 
                agend_id,
                veic_usu_id,
                agend_data,
                agend_horario,
                agend_situacao,
                agend_observ
                FROM agendamentos
                WHERE agend_situacao = ?`;

            const values = [agend_situacao];
            const [agendamentos] = await db.query(sql, values);
            const nItens = agendamentos.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de agendamentos com a situação: ${agend_situacao}`,
                dados: agendamentos,
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

    async cadastrarAgendamento(request, response) {
        try {
            const {
                veic_usu_id,
                agend_data,
                agend_horario,
                agend_situacao,
                agend_observ
            } = request.body;

            const sql = `INSERT INTO agendamentos 
                (veic_usu_id, agend_data, agend_horario, agend_situacao, agend_observ) 
                VALUES (?, ?, ?, ?, ?)`;

            const values = [
                veic_usu_id,
                agend_data,
                agend_horario,
                agend_situacao,
                agend_observ
            ];

            const [execSql] = await db.query(sql, values);
            const agend_id = execSql.insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de agendamento efetuado com sucesso.',
                dados: agend_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarAgendamento(request, response) {
        try {
            const {
                veic_usu_id,
                agend_data,
                agend_horario,
                agend_situacao,
                agend_observ
            } = request.body;

            const { agend_id } = request.params;

            const sql = `UPDATE agendamentos SET 
                veic_usu_id = ?, 
                agend_data = ?, 
                agend_horario = ?, 
                agend_situacao = ?, 
                agend_observ = ? 
                WHERE agend_id = ?`;

            const values = [
                veic_usu_id,
                agend_data,
                agend_horario,
                agend_situacao,
                agend_observ,
                agend_id
            ];

            const [atualizaDados] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Agendamento ${agend_id} atualizado com sucesso!`,
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

    async editarSituacaoAgendamento(request, response) {
        try {
            const { agend_id } = request.params;
            const { agend_situacao } = request.body;

            const sql = `UPDATE agendamentos SET 
                agend_situacao = ? 
                WHERE agend_id = ?`;

            const values = [agend_situacao, agend_id];

            const [atualizaDados] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Situação do agendamento ${agend_id} atualizada com sucesso!`,
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

    async excluirAgendamento(request, response) {
        try {
            const { agend_id } = request.params;
            const sql = `DELETE FROM agendamentos WHERE agend_id = ?`;
            const values = [agend_id];
            const [excluir] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Agendamento ${agend_id} excluído com sucesso`,
                dados: excluir.affectedRows
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
