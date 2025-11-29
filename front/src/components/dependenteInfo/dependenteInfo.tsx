import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api, { Dependente, Titular } from '../../services/api';
import '../titularInfo/titularInfo.css';

const DependenteInfo: React.FC = () => {
  const { id } = useParams();
  const [dependente, setDependente] = useState<Dependente | null>(null);
  const [titular, setTitular] = useState<Titular | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const dep = await api.getDependente(id);
        setDependente(dep);
        const tit = await api.getTitular(dep.titularId);
        setTitular(tit);
      } catch {
        setDependente(null); setTitular(null);
      }
    })();
  }, [id]);

  return (
    <div className="accordion-demo menu-visualizartitular">
      <h1>Informações do Dependente</h1>
      <div className="card">
        <DataTable className='tabela' responsiveLayout="scroll" value={dependente ? [{
          nome: dependente.nome,
          nomeSocial: dependente.nomeSocial || '',
          documento: dependente.documento?.numero || '',
          titular: titular?.nome || ''
        }] : []}>
          <Column field="nome" header="Nome" />
          <Column field="nomeSocial" header="Nome Social" />
          <Column field="documento" header="Documento" />
          <Column field="titular" header="Titular" />
        </DataTable>
      </div>
    </div>
  );
};

export default DependenteInfo;