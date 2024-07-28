'use client';

import styles from './index.module.css';
import Swal from 'sweetalert2';
import React, { useState } from 'react';

export default function CadCliente() {
    const [formData, setFormData] = useState({
        codigo_cliente: '',
        nome_cliente: '',
        cpf_cliente: '',
        data_nasc_cliente: '',
        sexo_cliente: '',
        nivel_acesso: '',
        telefone_cliente: '',
        email_cliente: '',
        observacoes_cliente: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Esta função será responsável por enviar dados para a API
    };

    const Pesquisar = () => {
        Swal.fire({
            width: 1200,
            title: 'Localizar Cliente',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Código">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Nome">',
            showCloseButton: true,
            backdrop: `rgba(0,0,0,0.8)`,
            customClass: {
                popup: 'my-swal'
            }
        });
    };

    const Novo = () => {
        Swal.fire({
            width: 1200,
            title: 'Novo Cliente',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nome">' +
                '<input id="swal-input2" class="swal2-input" placeholder="CPF">',
            showCloseButton: true,
            backdrop: `rgba(56,79,126,0.8)`,
            customClass: {
                popup: 'my-swal'
            }
        });
    };

    return (
        <div id="clientes" className={`${styles.content_section}`}>
            <h2 className={styles.title_page}>Gerenciamento de Clientes</h2>
            <div className={styles.button_group}>
                <button id="novoCliente" onClick={Novo}>Novo</button>
                <button id="alterarCliente">Alterar</button>
                <button id="excluirCliente">Excluir</button>
                <button id="localizarCliente" onClick={Pesquisar}>Localizar</button>
            </div>

            <form id="clienteForm" className={styles.form} onSubmit={handleSubmit}>
                <input type="hidden" id="clienteId" className={styles.input_cliente} />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label htmlFor="codigo_cliente" className={styles.label_cliente}>Código</label>
                        <input type="number" id="codigo_cliente" name="codigo_cliente" required className={styles.input_cliente} value={formData.codigo_cliente} onChange={handleInputChange} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                        <label htmlFor="nome_cliente" className={styles.label_cliente}>Nome:</label>
                        <input type="text" id="nome_cliente" name="nome_cliente" required className={styles.input_cliente} placeholder="Nome Completo" value={formData.nome_cliente} onChange={handleInputChange} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_cpf}`}>
                        <label htmlFor="cpf_cliente" className={styles.label_cliente}>CPF:</label>
                        <input type="text" id="cpf_cliente" name="cpf_cliente" required className={styles.input_cliente} placeholder="xxx.xxx.xxx-xx" value={formData.cpf_cliente} onChange={handleInputChange} />
                    </div>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_data}`}>
                    <label htmlFor="data_nasc_cliente" className={styles.label_cliente}>Data de nascimento:</label>
                    <input type="date" id="data_nasc_cliente" name="data_nasc_cliente" required className={styles.input_cliente} value={formData.data_nasc_cliente} onChange={handleInputChange} />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_sexo}`}>
                    <label htmlFor="sexo_cliente" className={styles.label_cliente}>Sexo:</label>
                    <select id="sexo_cliente" name="sexo_cliente" required className={`${styles.select_cliente} ${styles.input_sexo}`} value={formData.sexo_cliente} onChange={handleInputChange}>
                        <option value="" disabled>Selecionar</option>
                        <option value="0">Masculino</option>
                        <option value="1">Feminino</option>
                        <option value="2">Outro</option>
                    </select>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_acesso}`}>
                    <label htmlFor="nivel_acesso" className={styles.label_cliente}>Nível de Acesso:</label>
                    <select id="nivel_acesso" name="nivel_acesso" className={`${styles.select_cliente} ${styles.input_acesso}`} value={formData.nivel_acesso} onChange={handleInputChange}>
                        <option value="0">Usuário</option>
                        <option value="1">Administrador</option>
                    </select>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_telefone}`}>
                    <label htmlFor="telefone_cliente" className={styles.label_cliente}>Telefone:</label>
                    <input type="tel" id="telefone_cliente" name="telefone_cliente" required className={styles.input_cliente} placeholder="(xx) xxxxx-xxxxx" value={formData.telefone_cliente} onChange={handleInputChange} />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_email}`}>
                    <label htmlFor="email_cliente" className={styles.label_cliente}>Email:</label>
                    <input type="email" id="email_cliente" name="email_cliente" required className={styles.input_cliente} placeholder="exemplo@exemplo.com" value={formData.email_cliente} onChange={handleInputChange} />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                    <label htmlFor="observacoes_cliente" className={styles.label_cliente}>Observações</label>
                    <input type="text" id="observacoes_cliente" name="observacoes_cliente" required className={styles.input_cliente} value={formData.observacoes_cliente} onChange={handleInputChange} />
                </div>

                <div className={styles.footer_form}>
                    <button type="button" onClick={() => setFormData({
                        codigo_cliente: '',
                        nome_cliente: '',
                        cpf_cliente: '',
                        data_nasc_cliente: '',
                        sexo_cliente: '',
                        nivel_acesso: '',
                        telefone_cliente: '',
                        email_cliente: '',
                        observacoes_cliente: ''
                    })} className={styles.button_cancel}>Cancelar</button>
                    <button type="submit" className={styles.button_submit}>Salvar</button>
                </div>
            </form>
        </div>
    );
}
