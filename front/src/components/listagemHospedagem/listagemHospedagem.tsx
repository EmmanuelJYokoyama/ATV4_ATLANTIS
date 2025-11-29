import React, { useState, useEffect } from 'react';
import './listagemHospedagem.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useNavigate } from 'react-router';
import api, { Hospedagem, Titular, Acomodacao } from '../../services/api';


const ListagemHospedagem: React.FC = () =>{
    const [rows, setRows] = useState<any[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const [hs, tits, acoms] = await Promise.all([api.listHospedagens(), api.listTitulares(), api.listAcomodacoes()]);
                const mapTit = new Map(tits.map(t => [t.id, t] as [string,Titular]));
                const mapAcom = new Map(acoms.map(a => [a.id, a] as [string,Acomodacao]));
                const composed = hs.map(h => ({
                    ...h,
                    nomeAcomodacao: mapAcom.get(h.acomodacaoId)?.nome || '',
                    nomeTitular: mapTit.get(h.titularId)?.nome || '',
                    documento: mapTit.get(h.titularId)?.documento?.numero || '',
                    dataEntrada: h.checkin
                }));
                setRows(composed);
            } catch(e) { console.error(e); }
        })();
    }, []);

    const visualizarHospede = (row: any) =>{
        if (row.titularId){
            navigate(`/titular-info/${row.titularId}`)
        }
    }
    
    const actionBodyTemplate = (row: any) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-user" 
                    className="p-button-rounded p-button-outlined p-button-info " 
                    onClick={() => visualizarHospede(row)}
                    tooltip='Visualizar Hóspede' tooltipOptions={{position: 'top'}}/> 
            </React.Fragment>
        );
    }

    
    
    return(
        <div className='menu-hospede'>
            <div className='card'>
                <h1>Listagem de Hóspedes</h1>
                <DataTable value={rows} responsiveLayout="scroll">
                    <Column field="nomeAcomodacao" header="Acomodação" sortable></Column>
                    <Column field="nomeTitular" header="Hóspede (titular)" sortable></Column>
                    <Column field="documento" header="Documento" sortable></Column>
                    <Column field="dataEntrada" header="Data Cadastro" sortable></Column>
                    <Column body={actionBodyTemplate} header=''exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

        </div>
    )
}
export default ListagemHospedagem