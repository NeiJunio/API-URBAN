const db = require('../database/connection');

module.exports = {
    async listarAgendamentos(request, response) {
        try {
            const { UsuarioId } = request.params;
    
            const sqlUsuario = `
                SELECT a.agend_id,
                       a.veic_usu_id,
                       a.agend_data,
                       a.agend_horario,
                       a.agend_serv_situ_id,
                       a.agend_observ,
                       u.usu_id,
                       u.usu_nome,
                       v.veic_placa,
                       v.veic_ano,
                       v.veic_cor,
                       s.serv_nome, 
                       s.serv_duracao
                  FROM agendamentos a
                  JOIN veiculo_usuario vu ON a.veic_usu_id = vu.veic_usu_id
                  JOIN usuarios u         ON vu.usu_id = u.usu_id
                  JOIN veiculos v         ON vu.veic_id = v.veic_id
                  JOIN servicos s         ON a.serv_id = s.serv_id
                 WHERE u.usu_id = ?`;
    
            const [agendamentosUsuario] = await db.query(sqlUsuario, [UsuarioId]);
            const nItensUsuario = agendamentosUsuario.length;
    
            const sqlTodos = `
                SELECT a.agend_id,
                       a.veic_usu_id,
                       DATE_FORMAT(a.agend_data, '%Y-%m-%d') AS agend_data_formatada,
                       a.agend_horario,
                       a.agend_serv_situ_id,
                       a.agend_observ,
                       vu.usu_id,
                       v.veic_placa,
                       v.veic_ano,
                       v.veic_cor,
                       s.serv_nome, 
                       s.serv_duracao
                  FROM agendamentos a
                  JOIN veiculo_usuario vu ON a.veic_usu_id = vu.veic_usu_id
                  JOIN veiculos v         ON vu.veic_id = v.veic_id
                  JOIN servicos s         ON a.serv_id = s.serv_id`;
    
            const [todosAgendamentos] = await db.query(sqlTodos);
            const nItensTodos = todosAgendamentos.length;
    
            const colorMap = {
                1: '#e69500f3',  // Pendente - Dourado
                2: '#1b77d4',    // Em andamento - Azul
                3: '#26a426',    // Concluído - Verde
                4: '#c3290e'     // Cancelado - Vermelho
            };
    


            // const Resultado = todosAgendamentos.map((e) => ({
            //     agend_id: e.agend_id,
            //     usu_id: e.usu_id,
            //     veic_usu_id: e.veic_usu_id,
            //     veic_placa: e.veic_placa,
            //     veic_ano: e.veic_ano,
            //     veic_cor: e.veic_cor,
            //     agend_data: e.agend_data_formatada,
            //     agend_horario: e.agend_horario,
            //     agend_serv_situ_id: e.agend_serv_situ_id,
            //     agend_observ: e.agend_observ,
            //     serv_nome: e.serv_nome,
            //     serv_duracao: e.serv_duracao,
            //     title: `Agendamento #${e.agend_id}`,
            //     start: `${e.agend_data_formatada}T${e.agend_horario}`,
            //     end: `${e.agend_data_formatada}T${e.agend_horario}`,
            //     overlap: false,
            //     backgroundColor: colorMap[e.agend_serv_situ_id] || '#33338',  // Atribui a cor conforme o status
            // }));
    

            const Resultado = todosAgendamentos.map((e) => {
                // Convertendo agend_horario em um objeto Date
                const [hora, minuto, segundo] = e.agend_horario.split(':').map(Number);  // Parseia a hora, minuto e segundo
                const agendData = new Date(`${e.agend_data_formatada}T${e.agend_horario}`); // Cria a data completa com a hora
            
                // Parseando a duração do serviço (serv_duracao) que está no formato "HH:MM:SS"
                const [duracaoHora, duracaoMinuto, duracaoSegundo] = e.serv_duracao.split(':').map(Number);
            
                // Adicionando a duração ao horário do agendamento
                agendData.setHours(agendData.getHours() + duracaoHora);
                agendData.setMinutes(agendData.getMinutes() + duracaoMinuto);
                agendData.setSeconds(agendData.getSeconds() + duracaoSegundo);
            
                // Formatando a data de término no formato ISO 8601
                const end = agendData.toISOString(); 
            
                return {
                    agend_id: e.agend_id,
                    usu_id: e.usu_id,
                    veic_usu_id: e.veic_usu_id,
                    veic_placa: e.veic_placa,
                    veic_ano: e.veic_ano,
                    veic_cor: e.veic_cor,
                    agend_data: e.agend_data_formatada,
                    agend_horario: e.agend_horario,
                    agend_serv_situ_id: e.agend_serv_situ_id,
                    agend_observ: e.agend_observ,
                    serv_nome: e.serv_nome,
                    serv_duracao: e.serv_duracao,
                    title: `Agendamento #${e.agend_id}`,
                    start: `${e.agend_data_formatada}T${e.agend_horario}`,
                    end: end, // Novo valor de 'end' com a duração somada
                    // event_time: e.agend_horario,
                    overlap: false,
                    backgroundColor: colorMap[e.agend_serv_situ_id] || '#33338',  // Atribui a cor conforme o status
                };
            });

            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de agendamentos do usuário ID ${UsuarioId} e todos os agendamentos.`,
                dadosUsuario: agendamentosUsuario,
                nItensUsuario,
                dadosTodos: Resultado,
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
            const sql = `
                SELECT ag.agend_id, 
                       ag.veic_usu_id, 
                       ag.agend_data, 
                       ag.agend_horario, 
                       ag.agend_observ, 
                       ag.agend_situacao, 
                       ag.serv_id,
                       ag.agend_serv_situ_id, 
                       ve.veic_placa,
                       se.serv_nome AS serv_nome, 
                       us.usu_nome AS usu_nome
                  FROM agendamentos ag
            INNER JOIN veiculo_usuario vu ON ag.veic_usu_id = vu.veic_usu_id
            INNER JOIN usuarios us        ON vu.usu_id = us.usu_id
            INNER JOIN veiculos ve        ON vu.veic_id = ve.veic_id
             LEFT JOIN servicos se        ON ag.serv_id = se.serv_id;
            `;

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

            const sql = `
                SELECT agend_id,
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

    async listarAgendamentosPorUsuario(request, response) {
        try {
            const { UsuarioId } = request.params;

            const sql = `
                SELECT a.agend_id,
                       a.veic_usu_id,
                       a.agend_data,
                       a.agend_horario,
                       a.agend_serv_situ_id,
                       a.agend_observ,
                       u.usu_id,
                       u.usu_nome,
                       v.veic_placa,
                       v.veic_ano,
                       v.veic_cor,
                       s.serv_nome 
                  FROM agendamentos a
                  JOIN veiculo_usuario vu ON a.veic_usu_id = vu.veic_usu_id
                  JOIN usuarios u         ON vu.usu_id = u.usu_id
                  JOIN veiculos v         ON vu.veic_id = v.veic_id
                  JOIN servicos s         ON a.serv_id = s.serv_id 
                 WHERE u.usu_id = ?
            `;

            const values = [UsuarioId];
            const [agendamentosPorUsuario] = await db.query(sql, values);

            if (agendamentosPorUsuario.length > 0) {
                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'Agendamentos do usuário.',
                    dados: agendamentosPorUsuario
                });
            } else {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Nenhum agendamento encontrado para o usuário.',
                    dados: null
                });
            }
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

            const sql = `
                UPDATE agendamentos
                   SET veic_usu_id = ?, 
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
            const { agend_serv_situ_id } = request.body;

            const sql = `
                UPDATE agendamentos
                   SET agend_serv_situ_id = ? 
                 WHERE agend_id = ?`;

            const values = [agend_serv_situ_id, agend_id];

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
            
            const sql = `
                DELETE *
                  FROM agendamentos
                 WHERE agend_id = ?`;
            
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
