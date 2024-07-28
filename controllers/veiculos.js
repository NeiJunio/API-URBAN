const db = require('../database/connection');

module.exports = {
    async listarVeiculos(request, response) {
        try {
            const sql = `SELECT 
                veic_id, 
                mod_id, 
                veic_placa, 
                veic_ano, 
                veic_cor, 
                veic_combustivel, 
                veic_observ,
                veic_situacao 
                FROM veiculos;`;
            
            const [veiculos] = await db.query(sql);
            const nItens = veiculos.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de veículos.',
                dados: veiculos,
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
    async cadastrarVeiculo(request, response) {
        try {
            const { 
                mod_id, 
                veic_placa, 
                veic_ano, 
                veic_cor, 
                veic_combustivel, 
                veic_observ,
                veic_situacao 
            } = request.body;
            
            const sql = `INSERT INTO veiculos 
                (mod_id, veic_placa, veic_ano, veic_cor, veic_combustivel, veic_observ, veic_situacao) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            
            const values = [
                mod_id, 
                veic_placa, 
                veic_ano, 
                veic_cor, 
                veic_combustivel, 
                veic_observ,
                veic_situacao
            ];
            
            const [execSql] = await db.query(sql, values);
            const veic_id = execSql.insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de veículo efetuado com sucesso.',
                dados: veic_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarVeiculo(request, response) {
        try {
            const { 
                mod_id, 
                veic_placa, 
                veic_ano, 
                veic_cor, 
                veic_combustivel, 
                veic_observ
            } = request.body;
            
            const { veic_id } = request.params;
            
            const sql = `UPDATE veiculos SET 
                mod_id = ?, 
                veic_placa = ?, 
                veic_ano = ?, 
                veic_cor = ?, 
                veic_combustivel = ?, 
                veic_observ = ? 
                WHERE veic_id = ?;`;
            
            const values = [
                mod_id, 
                veic_placa, 
                veic_ano, 
                veic_cor, 
                veic_combustivel, 
                veic_observ, 
                veic_id
            ];
            
            const [atualizaDados] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Veículo ${veic_id} atualizado com sucesso!`,
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
    async excluirVeiculo(request, response) {
        try {
            const { veic_id } = request.params;
            const sql = `DELETE FROM veiculos WHERE veic_id = ?`;
            const values = [veic_id];
            const [excluir] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Veículo ${veic_id} excluído com sucesso`,
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
    async ocultarVeiculo(request, response) {
        try {

            const {
                veic_situacao
            } = request.body;

            const veic_ativo = 0;
            const { veic_id } = request.params;
            const sql = `UPDATE veiculos SET veic_situacao = ? WHERE veic_id = ?;`;
            const values = [veic_situacao, veic_id];
            const [atualizacao] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Veículo ${veic_id} ${veic_situacao == 1 ? 'reativado' : 'desativado'} com sucesso`,
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
}
