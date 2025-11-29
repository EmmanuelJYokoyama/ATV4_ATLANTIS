import React, { useState, useEffect } from 'react';
import './listagemAcomodacoes.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api, { Acomodacao } from '../../services/api';

const ListagemAcomodacoes: React.FC = () =>{
    
    const [acomodacoes,setAcomodacoes] = useState<Acomodacao[]>([])

    useEffect(() => {
        api.listAcomodacoes().then(setAcomodacoes).catch(console.error);
    }, []); 

    return(
        <div className='accordion-demo menu-hospedagem"'>
            <div className="card menu-hospedagem">
            <h1>Listagem de Acomodações</h1>            
                <DataTable value={acomodacoes} responsiveLayout="scroll">
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column field="capacidade" header="Capacidade" sortable></Column>
                    <Column field="descricao" header="Descrição" sortable></Column>
                </DataTable>

            </div>
        </div>
    )

}
export default ListagemAcomodacoes