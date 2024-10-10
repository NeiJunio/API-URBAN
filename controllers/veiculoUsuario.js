const db = require('../database/connection');

module.exports = {
    // Função para listar todas as relações entre veículos e usuários
    async listarVeiculosUsuario(request, response) {
        try {
            // Definindo a consulta SQL para selecionar todas as colunas da tabela veiculo_usuario
            const sql = `SELECT 
                veic_usu_id, 
                veic_id, 
                usu_id, 
                ehproprietario, 
                data_inicial, 
                data_final
                FROM veiculo_usuario`;

            // Executando a consulta e armazenando os resultados
            const [veiculosUsuarios] = await db.query(sql);
            const nItens = veiculosUsuarios.length;

            // Retornando a lista de veículos-usuários em formato JSON
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de veículos e usuários.',
                dados: veiculosUsuarios,
                nItens
            });
        } catch (error) {
            // Tratamento de erro
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async listarVeiculoUsuarioPorId(request, response) {
        try {
            const { VeiculoId } = request.params;


            const sql = `SELECT 
                        vu.veic_usu_id, 
                        vu.veic_id, 
                        vu.usu_id, 
                        vu.ehproprietario = 1 AS ehproprietario, 
                        vu.data_inicial,
                        vu.data_final, 
                        u.usu_nome,
                        u.usu_cpf   
                     FROM veiculo_usuario vu
                     JOIN usuarios u ON vu.usu_id = u.usu_id
                     WHERE vu.veic_id = ?`;

            const [veiculosUsuariosPorId] = await db.query(sql, [VeiculoId]);
            const nItens = veiculosUsuariosPorId.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Veiculos com seus respectivos usuários.',
                dados: veiculosUsuariosPorId,
                nItens
            });
        }
        catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    // Função para cadastrar uma nova relação entre veículo e usuário
    async cadastrarVeiculoUsuario(request, response) {
        try {
            // Extraindo os dados do corpo da requisição
            const {
                veic_id,
                usu_id,
                data_inicial
            } = request.body;

            // Validação dos campos necessários
            if (!veic_id || !usu_id || !data_inicial) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Veículo ID, Usuário ID e Data Inicial são obrigatórios.'
                });
            }

            // Definindo o valor de ehproprietario como 1, já que não há mais o campo data_final
            const ehproprietario = 1;

            // Definindo a consulta SQL para inserir os novos dados
            const sql = `INSERT INTO veiculo_usuario 
                (veic_id, usu_id, ehproprietario, data_inicial) 
                VALUES (?, ?, ?, ?)`;

            // Definindo os valores para a consulta
            const values = [
                veic_id,
                usu_id,
                ehproprietario,
                data_inicial
            ];

            // Executando a consulta e armazenando o ID do novo registro
            const [execSql] = await db.query(sql, values);
            const veic_usu_id = execSql.insertId;

            // Retornando uma resposta JSON confirmando o sucesso do cadastro
            return response.status(201).json({
                sucesso: true,
                mensagem: 'Cadastro de veículo e usuário efetuado com sucesso.',
                dados: veic_usu_id
            });
        } catch (error) {
            // Tratamento de erro
            console.error("Erro ao cadastrar veículo e usuário:", error); // Log do erro
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message // Pode ser útil, mas em produção, evite expor detalhes do erro
            });
        }
    },

    // // Função para editar uma relação existente entre veículo e usuário
    // async editarVeiculoUsuario(request, response) {
    //     try {
    //         // Extraindo os dados do corpo da requisição
    //         const {
    //             veic_id,
    //             usu_id,
    //             data_inicial,
    //             data_final
    //         } = request.body;

    //         // Pegando o veic_usu_id dos parâmetros da URL
    //         const { veic_usu_id } = request.params;

    //         // Determinando o valor de ehproprietario com base na data_final
    //         const ehproprietario = (data_final === null || data_final === '0' || data_final === 0) ? 1 : 0;

    //         // Definindo a consulta SQL para atualizar os dados existentes
    //         const sql = `UPDATE veiculo_usuario SET 
    //             veic_id = ?, 
    //             usu_id = ?, 
    //             ehproprietario = ?, 
    //             data_inicial = ?, 
    //             data_final = ? 
    //             WHERE veic_usu_id = ?`;

    //         // Definindo os valores para a consulta, garantindo que data_final seja null se não fornecida
    //         const values = [
    //             veic_id,
    //             usu_id,
    //             ehproprietario,
    //             data_inicial,
    //             data_final ? data_final : null,
    //             veic_usu_id
    //         ];

    //         // Executando a consulta e armazenando o número de linhas afetadas
    //         const [atualizaDados] = await db.query(sql, values);

    //         // Retornando uma resposta JSON confirmando o sucesso da atualização
    //         return response.status(200).json({
    //             sucesso: true,
    //             mensagem: `Veículo e usuário ${veic_usu_id} atualizado com sucesso!`,
    //             dados: atualizaDados.affectedRows
    //         });
    //     } catch (error) {
    //         // Tratamento de erro
    //         return response.status(500).json({
    //             sucesso: false,
    //             mensagem: 'Erro na requisição.',
    //             dados: error.message
    //         });
    //     }
    // },

    async editarVeiculoUsuario(request, response) {
        const { veic_usu_id } = request.params; // Obtendo o ID do veículo-usuário da URL
        const { data_inicial, data_final } = request.body; // Obtendo os dados a serem atualizados do corpo da requisição
    
        console.log('URL da requisição:', request.originalUrl);
        console.log('ID do veículo-usuário:', veic_usu_id);
        console.log('Data inicial:', data_inicial, 'Data final:', data_final);
    
        try {
            // Definindo a consulta SQL para atualizar o registro na tabela veiculo_usuario
            const sql = `UPDATE veiculo_usuario SET 
                            data_inicial = ?, 
                            data_final = ? 
                        WHERE veic_usu_id = ?`;
    
            // Executando a consulta, passando os dados para atualização
            const [result] = await db.query(sql, [data_inicial, data_final, veic_usu_id]);
            console.log('Resultado da consulta:', result);
    
            // Verificando se a atualização foi bem-sucedida
            if (result.affectedRows > 0) {
                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'Veículo-usuário atualizado com sucesso.'
                });
            } else {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Veículo-usuário não encontrado.'
                });
            }
        } catch (error) {
            // Tratamento de erro
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na atualização do veículo-usuário.',
                dados: error.message
            });
        }
    },    

    // Função para excluir uma relação existente entre veículo e usuário
    async excluirVeiculoUsuario(request, response) {
        try {
            // Pegando o veic_usu_id dos parâmetros da URL
            const { veic_usu_id } = request.params;

            // Definindo a consulta SQL para deletar a relação
            const sql = `DELETE FROM veiculo_usuario WHERE veic_usu_id = ?`;
            const values = [veic_usu_id];

            // Executando a consulta e armazenando o número de linhas afetadas
            const [excluir] = await db.query(sql, values);

            // Retornando uma resposta JSON confirmando o sucesso da exclusão
            return response.status(200).json({
                sucesso: true,
                mensagem: `Relação veículo-usuário ${veic_usu_id} excluída com sucesso`,
                dados: excluir.affectedRows
            });
        } catch (error) {
            // Tratamento de erro
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
}
