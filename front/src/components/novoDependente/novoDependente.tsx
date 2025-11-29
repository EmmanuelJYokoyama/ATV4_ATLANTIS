import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import './novoDependente.css'
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import api from '../../services/api';

const NovoDependente: React.FC = ()=>{

    // --- Documento do Titular ---
    const [nomeTitular,setNomeTitular] = useState('')
    const [documentoTitular,setDocumentoTitular] = useState<number | null | undefined>(undefined)

     // --- Documento do Titular ---
    const [documentoDependente,setDocumentoDependente] = useState<number | null | undefined>(undefined)
    const [docSelecionado, setdocSelecionado] = useState<any>(null);
    const docs = [
        { tipo: 'RG', code: 'NY' },
        { tipo: 'CPF', code: 'RM' },
        { tipo: 'PASSAPORTE', code: 'LDN' }
    ]
    const tipoDoc= (e: { value: any}) => {
        setdocSelecionado(e.value);
    }

    // --- Dependentes ---
    const [nomeDependente, setNomeDependente] = useState('');
    const [nomeSocialDependente, setNomeSocialDependente] = useState('')
    const [dataNascimentoDependente, setdataNascimentoDependente] = useState<string|undefined>()

    async function salvarDependente(){
        try {
            const titulares = await api.listTitulares();
            const titular = titulares.find(t => (t.documento?.numero === String(documentoTitular ?? '') ) || t.nome.trim().toLowerCase() === nomeTitular.trim().toLowerCase());
            if (!titular) { alert('Titular não encontrado'); return; }
            await api.createDependente({
                titularId: titular.id,
                nome: nomeDependente,
                nomeSocial: nomeSocialDependente,
                dataNascimento: dataNascimentoDependente,
                documento: { tipo: docSelecionado?.tipo, numero: String(documentoDependente ?? '') }
            } as any);
            alert('Dependente cadastrado com sucesso');
        } catch(e) { console.error(e); alert('Falha ao cadastrar dependente'); }
    }

    return(
        <div className="accordion-demo menu-novo-dependente page-container">
            <h1>Novo Dependente</h1>
            <div className='card'>
                <Accordion className="accordion-custom" activeIndex={3}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-id-card"></i><span>Dados do Titular</span></React.Fragment>}>
                        <span className="dados-pessoais-dependentes">
                            <InputText className='dados-pessoais-dependentes'placeholder='Nome do Titular' value={nomeTitular} onChange={(e) => setNomeTitular(e.target.value)} />                           
                        </span>
                        <span className="dados-pessoais-dependentes">
                            <InputNumber className='dados-pessoais-dependentes numero' placeholder='Número do Documento' value={documentoTitular} onValueChange={(e) => setDocumentoTitular(e.value)} />                           
                        </span>
                    </AccordionTab>
                </Accordion>

                <Accordion className="accordion-custom" activeIndex={3}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-user"></i><span>Dados Pessoais</span></React.Fragment>}>
                        <span className="dados-pessoais-dependentes">
                            <InputText className='dados-pessoais-dependentes'placeholder='Nome Dependente' value={nomeDependente} onChange={(e) => setNomeDependente(e.target.value)} />                           
                        </span>
                        <span className="dados-pessoais-dependentes">
                            <InputText className='dados-pessoais-dependentes'placeholder='Nome Social' value={nomeSocialDependente} onChange={(e) => setNomeSocialDependente(e.target.value)} />                           
                        </span>
                        <span className="dados-pessoais-dependentes">
                            <InputMask className='dados-pessoais-dependentes' mask="99/99/9999" value={dataNascimentoDependente} placeholder="Data Nascimento" onChange={(e) => setdataNascimentoDependente(e.value)}></InputMask>                           
                        </span>
                    </AccordionTab>
                </Accordion>

                <Accordion className="accordion-custom" activeIndex={2}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-copy"></i><span>Documentos</span></React.Fragment>}>
                        <Dropdown className='dados-pessoais-dependentes' value={docSelecionado} options={docs} onChange={tipoDoc} optionLabel="tipo" placeholder="Tipo de Documento" />
                        <span className="dados-pessoais-dependentes">                            
                            <InputNumber className='dados-pessoais-dependentes numero' placeholder='Número do Documento' value={documentoDependente} onValueChange={(e) => setDocumentoDependente(e.value)} />                        
                        </span>
                    </AccordionTab>
                </Accordion>  

                <div className="button-demo btn-cadastro-dependente">
                    <Button label="Cadastrar Dependente" icon="pi pi-check" onClick={salvarDependente} />              
                </div>    
            </div>
        </div>
    )
}
export default NovoDependente