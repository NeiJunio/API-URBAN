const db = require('../database/connection');

module.exports = {
    async listarVeiculosUsuarios(request, response) {
        try {
            const sql = `SELECT 
                veic_usu_id, 
                veic_id, 
                usu_id, 
                ehproprietario, 
                data_inicial, 
                data_final
                FROM veiculo_usuario`;

            const [veiculosUsuarios] = await db.query(sql);
            const nItens = veiculosUsuarios.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de veículos e usuários.',
                dados: veiculosUsuarios,
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

    async cadastrarVeiculoUsuario(request, response) {
        try {
            const {
                veic_id,
                usu_id,
                data_inicial,
                data_final
            } = request.body;

            const ehproprietario = (data_final === null || data_final === '0' || data_final === 0) ? 1 : 0;

            const sql = `INSERT INTO veiculo_usuario 
                (veic_id, usu_id, ehproprietario, data_inicial, data_final) 
                VALUES (?, ?, ?, ?, ?)`;

            const values = [
                veic_id,
                usu_id,
                ehproprietario,
                data_inicial,
                data_final ? data_final : null
            ];

            const [execSql] = await db.query(sql, values);
            const veic_usu_id = execSql.insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de veículo e usuário efetuado com sucesso.',
                dados: veic_usu_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async editarVeiculoUsuario(request, response) {
        try {
            const {
                veic_id,
                usu_id,
                data_inicial,
                data_final
            } = request.body;

            const { veic_usu_id } = request.params;

            const ehproprietario = (data_final === null || data_final === '0' || data_final === 0) ? 1 : 0;

            const sql = `UPDATE veiculo_usuario SET 
                veic_id = ?, 
                usu_id = ?, 
                ehproprietario = ?, 
                data_inicial = ?, 
                data_final = ? 
                WHERE veic_usu_id = ?`;

            const values = [
                veic_id,
                usu_id,
                ehproprietario,
                data_inicial,
                data_final ? data_final : null,
                veic_usu_id
            ];

            const [atualizaDados] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Veículo e usuário ${veic_usu_id} atualizado com sucesso!`,
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

    async excluirVeiculoUsuario(request, response) {
        try {
            const { veic_usu_id } = request.params;
            const sql = `DELETE FROM veiculo_usuario WHERE veic_usu_id = ?`;
            const values = [veic_usu_id];
            const [excluir] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Relação veículo-usuário ${veic_usu_id} excluída com sucesso`,
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
