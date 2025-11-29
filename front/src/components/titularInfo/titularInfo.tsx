import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import './titularInfo.css'
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useLocation, useParams } from 'react-router-dom';
import api, { Titular, Dependente } from '../../services/api';

const TitularInfo: React.FC = () =>{
    const location = useLocation();
    const params = useParams();
    const [titular, setTitular] = useState<Titular | null>(null);
    const [dependentes, setDependentes] = useState<Dependente[]>([]);

    async function carregarPorId(id: string){
        try {
            const t = await api.getTitular(id);
            setTitular(t);
            const deps = await api.listDependentes();
            setDependentes(deps.filter(d => d.titularId === t.id));
        } catch { setTitular(null); setDependentes([]); }
    }

    useEffect(() => {
        const stateTitular = (location.state as any)?.titular as Titular | undefined;
        const idParam = (params as any)?.id as string | undefined;
        if (stateTitular){
            setTitular(stateTitular);
            api.listDependentes().then(deps => setDependentes(deps.filter(d => d.titularId === stateTitular.id)));
        } else if (idParam){
            carregarPorId(idParam);
        }
    }, [location.state, params]);

    return(
        <div className="accordion-demo menu-visualizartitular">
            <h1>Informações do Titular</h1>
            <div className="card">
                <Accordion className="accordion-custom" activeIndex={0}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-user"></i><span>Dados Pessoais</span></React.Fragment>}>
                    <DataTable className='tabela' responsiveLayout="scroll" value={titular ? [{
                        nome: titular.nome,
                        nomeSocial: titular.nomeSocial || '',
                        documento: titular.documento?.numero || '',
                        dataCadastro: titular.createdAt ? new Date(titular.createdAt).toLocaleDateString() : '',
                        Celular: titular.telefoneCelular || '',
                        Residencial: titular.telefoneResidencial || ''
                    }] : []}>
                        <Column field="nome" header="Nome"></Column>
                        <Column field="nomeSocial" header="Nome Social"></Column>
                        <Column field="documento" header="Documento"></Column>
                        <Column field="dataCadastro" header="Data Cadastro"></Column>
                        <Column field="Celular" header="Celular"></Column>
                        <Column field="Residencial" header="Tel.Residencial"></Column>
                    </DataTable>
                    </AccordionTab>
                </Accordion>

                <Accordion className="accordion-custom" activeIndex={1}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-map"></i><span>Endereço</span></React.Fragment>}>
                    <DataTable className='tabela' responsiveLayout='scroll' value={titular ? [{
                        pais: titular.endereco?.pais || '',
                        estado: titular.endereco?.estado || '',
                        cidade: titular.endereco?.cidade || '',
                        bairro: titular.endereco?.bairro || '',
                        rua: titular.endereco?.rua || '',
                        codigoPostal: titular.endereco?.cep || ''
                    }] : []}>
                        <Column field="pais" header="País"></Column>
                        <Column field="estado" header="Estado"></Column>
                        <Column field="cidade" header="Cidade"></Column>
                        <Column field="bairro" header="Bairro"></Column>
                        <Column field="rua" header="Rua"></Column>
                        <Column field="codigoPostal" header="Código Postal"></Column>
                        </DataTable>
                    </AccordionTab>
                </Accordion>

                <Accordion className="accordion-custom" activeIndex={2}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-copy"></i><span>Documentos</span></React.Fragment>}>
                    <DataTable className='tabela' responsiveLayout='scroll' value={titular ? [{ tipo: titular.documento?.tipo || '', numero: titular.documento?.numero || '' }] : []}>
                        <Column field="tipo" header="Tipo de Documento"></Column>
                        <Column field="numero" header="Número"></Column>
                        </DataTable>                   
                    </AccordionTab>
                </Accordion>

                <Accordion className="accordion-custom" activeIndex={2}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-sitemap"></i><span>Dependentes</span></React.Fragment>}>
                    <DataTable className='tabela' responsiveLayout="scroll" value={dependentes}>
                        <Column field="nome" header="Nome"></Column>
                        <Column field="documento.numero" header="Documento"></Column>
                        <Column field="dataNascimento" header="Data Nascimento"></Column>
                    </DataTable>            
                    </AccordionTab>
                </Accordion>                   

            </div>

                
        </div>           
    )
}
export default TitularInfo