import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./listagemTitular.css"
import { Navigate, useNavigate } from 'react-router';
import { Button } from 'primereact/button';
import api, { Titular } from '../../services/api';

const ListagemTitular: React.FC = () =>{
    const [titulares, setTitulares] = useState<Titular[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.listTitulares().then(setTitulares).catch(console.error);
    }, []);
    
    const visualizarHospede = (row: Titular) =>{
        navigate(`/titular-info/${row.id}`)
    }

    const editarTitular = (row: Titular) =>{
        navigate(`/editar-titular/${row.id}`)
    }

    const actionBodyTemplate = (row: Titular) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-user" 
                    className="p-button-rounded p-button-outlined p-button-info" 
                    onClick={() => visualizarHospede(row)}
                    tooltip='Visualizar Hóspede' tooltipOptions={{position: 'top'}}
                /> 
                <Button
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-outlined p-button-info " 
                    onClick={() => editarTitular(row)}
                    tooltip='Editar Titular' tooltipOptions={{position: 'top'}}
                />
                <Button
                    icon="pi pi-times" 
                    className="p-button-rounded p-button-outlined p-button-danger" 
                    
                    tooltip='Deletar Titular' tooltipOptions={{position: 'top'}}
                />  
            </React.Fragment>
        );
    }

    

    return(
        <div className='menu-listagem'>
            <div className="card">
                <h1>Clientes Titulares</h1>
                <DataTable value={titulares} responsiveLayout="scroll">
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column field="nomeSocial" header="Nome Social" sortable></Column>
                    <Column header="Documento" body={(row: Titular) => row.documento?.numero || ''} sortable></Column>
                    <Column field="dataNascimento" header="Data Nascimento" sortable></Column>
                    <Column body={actionBodyTemplate} header='Opções'exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default ListagemTitular