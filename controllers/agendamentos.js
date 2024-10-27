const db = require('../database/connection');

module.exports = {
    async listarAgendamentos(request, response) {
        try {
            const { UsuarioId } = request.params;

            // Consulta para os agendamentos do usuário específico
            const sqlUsuario = `SELECT 
                a.agend_id,
                a.veic_usu_id,
                a.agend_data,
                a.agend_horario,
                a.agend_situacao,
                a.agend_observ,
                u.usu_id,
                u.usu_nome
            FROM agendamentos a
            JOIN veiculo_usuario vu ON a.veic_usu_id = vu.veic_usu_id
            JOIN usuarios u ON vu.usu_id = u.usu_id
            WHERE u.usu_id = ?`; // Filtro pelo ID do usuário

            const [agendamentosUsuario] = await db.query(sqlUsuario, [UsuarioId]); // Passa o usu_id como parâmetro para a query
            const nItensUsuario = agendamentosUsuario.length;

            // Consulta para todos os agendamentos com a data formatada
            const sqlTodos = `SELECT 
            a.agend_id,
            a.veic_usu_id,
            DATE_FORMAT(a.agend_data, '%Y-%m-%d') AS agend_data_formatada,
            a.agend_horario,
            a.agend_situacao,
            a.agend_observ,
            vu.usu_id -- Adicionando o usu_id
            FROM agendamentos a
            JOIN veiculo_usuario vu ON a.veic_usu_id = vu.veic_usu_id`;


            const [todosAgendamentos] = await db.query(sqlTodos);
            const nItensTodos = todosAgendamentos.length;

            // Mapeando os resultados para o formato esperado pelo FullCalendar
            const Resultado = todosAgendamentos.map((e) => ({
                agend_id: e.agend_id,
                usu_id: e.usu_id,
                veic_usu_id: e.veic_usu_id,
                agend_data: e.agend_data_formatada,
                agend_horario: e.agend_horario,
                agend_situacao: e.agend_situacao,
                agend_observ: e.agend_observ,
                title: `Agendamento #${e.agend_id}`,
                start: `${e.agend_data_formatada}T${e.agend_horario}`,
                end: `${e.agend_data_formatada}T${e.agend_horario}`,
                overlap: false,
                backgroundColor: (e.usu_id == UsuarioId) ? "#FF9D00" : "#33338", // Muda a cor baseado no usuário
            }));


            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de agendamentos do usuário ID ${UsuarioId} e todos os agendamentos.`,
                dadosUsuario: agendamentosUsuario,
                nItensUsuario,
                dadosTodos: Resultado,  // Enviar o array formatado para o frontend
                nItensTodos
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async listarTodosAgendamentos(request, response) {
        try {
            const sql = `SELECT * FROM agendamentos`;

            const [agendamentos] = await db.query(sql);
            const nItens = agendamentos.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de agendamentos`,
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
                agend_observ,
                serv_id,
                agend_serv_situ_id
            } = request.body;

            const sql = `INSERT INTO agendamentos 
                (veic_usu_id, agend_data, agend_horario, agend_situacao, agend_observ, serv_id, agend_serv_situ_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                veic_usu_id,
                agend_data,
                agend_horario,
                agend_situacao,
                agend_observ,
                serv_id,
                agend_serv_situ_id
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
