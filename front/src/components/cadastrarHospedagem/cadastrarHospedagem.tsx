import React, { useEffect, useState } from 'react';
import './cadastrarHospedagem.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import api, { Acomodacao } from '../../services/api';

const CadastrarHospedagem: React.FC = () =>{

    // --- Hospedagem ---
    const [documento,setDocumento] = useState<number | null | undefined>(undefined)

    const [selecionadoAcomodacao, setSelecionadoAcomodacao] = useState<Acomodacao | null>(null)
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([])
    useEffect(() => {
        // Carrega da pasta public/data para uso local
        fetch('/data/listaAcomodacoes.json')
            .then(r => r.json())
            .then((data) => {
                // Adapta ao formato esperado pelo Dropdown e cadastro
                const raw = Array.isArray(data) ? data : (data?.data || []);
                const items: Acomodacao[] = raw.map((r: any) => ({
                    // usa o nome como id estável para selecionar
                    id: String(r.nomeAcomodacao ?? r.nome ?? ''),
                    nome: String(r.nomeAcomodacao ?? r.nome ?? ''),
                    capacidade: Number((r.camaSolteiro ?? 0)) + Number((r.camaCasal ?? 0)) * 2,
                    descricao: `Suítes: ${r.suite}, Clima: ${r.climatizacao}, Garagem: ${r.garagem}`
                }));
                setAcomodacoes(items);
            })
            .catch(console.error);
    }, []);
    const tipoAcomodacao= (e: { value: any}) => { setSelecionadoAcomodacao(e.value); }

    async function registrarHospedagem(){
        try {
            const tits = await api.listTitulares();
            const titular = tits.find(t => t.documento?.numero === String(documento ?? ''));
            if (!titular) { alert('Titular não encontrado pelo documento'); return; }
            if (!selecionadoAcomodacao) { alert('Selecione a acomodação'); return; }
            await api.createHospedagem({ titularId: titular.id, acomodacaoId: selecionadoAcomodacao.id, checkin: new Date().toISOString() } as any);
            alert('Hóspede registrado com sucesso');
        } catch(e) { console.error(e); alert('Falha ao registrar hospedagem'); }
    }

    return(
        <div className=' menu-hospedagem page-container'>
            <h1>Registrar Hóspede</h1>
            <div className='field campos-hospedagem1'>
                <span className="dados-hospedagem">                            
                    <InputNumber className='dados-hospedagem numero' placeholder='Número do documento do Titular' value={documento} onValueChange={(e) => setDocumento(e.value)} />                        
                </span>
            </div>
            <div className='dropdown-demo field campos-hospedagem'>
                <span className="dados-hospedagem">                    
                    <Dropdown className='dados-hospedagem' value={selecionadoAcomodacao} options={acomodacoes} onChange={tipoAcomodacao} optionLabel="nome" placeholder="Escolha a Acomodação" />
                </span>
            </div>
            <div className="button-demo btn-cadastro-hospedagem">
                <Button label="Registrar Hóspede" icon="pi pi-check" onClick={registrarHospedagem} />              
            </div>    
        </div>
    )
}
export default CadastrarHospedagem