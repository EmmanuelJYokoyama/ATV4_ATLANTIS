import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./listagemDependentes.css"
import { useNavigate } from 'react-router';
import { Button } from 'primereact/button';
import api, { Dependente, Titular } from '../../services/api';

const ListagemDependente: React.FC = ()=>{
    const [rows, setRows] = useState<any[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const [deps, tits] = await Promise.all([api.listDependentes(), api.listTitulares()]);
                const mapTit = new Map(tits.map(t => [t.id, t.nome] as [string,string]));
                const composed = deps.map(d => ({
                    ...d,
                    nomeTitular: mapTit.get(d.titularId) || '',
                    documento: d.documento?.numero || ''
                }));
                setRows(composed);
            } catch (e) { console.error(e); }
        })();
    }, []);

    const editarDependente = (row: Dependente) =>{
        navigate(`/editar-dependente/${row.id}`)
    }

    const visualizarDependente = (row: Dependente) => {
        navigate(`/dependente-info/${row.id}`)
    }

    const actionBodyTemplate = (row: Dependente) => {
        return (
            <React.Fragment>               
                <Button
                    icon="pi pi-user" 
                    className="p-button-rounded p-button-outlined p-button-info" 
                    onClick={() => visualizarDependente(row)}
                    tooltip='Visualizar Dependente' tooltipOptions={{position: 'top'}}
                />
                <Button
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-outlined p-button-info " 
                    onClick={() => editarDependente(row)}
                    tooltip='Editar Dependente' tooltipOptions={{position: 'top'}}
                />
                <Button
                    icon="pi pi-times" 
                    className="p-button-rounded p-button-outlined p-button-danger" 
                    tooltip='Deletar Dependente' tooltipOptions={{position: 'top'}}
                />  
            </React.Fragment>
        );
    }

    

    return(
        <div className='menu-listagem-dependente'>
            <div className="card">
                <h1>Dependentes</h1>
                <DataTable value={rows} responsiveLayout="scroll">
                    <Column field="nomeTitular" header="Titular" sortable></Column>
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column field="documento" header="Documento" sortable></Column>
                    <Column field="dataNascimento" header="Data Nascimento" sortable></Column>
                    <Column body={actionBodyTemplate} header='Opções'exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
    )

}
export default ListagemDependente