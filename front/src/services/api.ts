const BASE = (process.env as any)?.REACT_APP_API_URL || 'http://localhost:3005/api';

export type Titular = {
  id: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento?: string;
  telefoneCelular?: string;
  telefoneResidencial?: string;
  documento?: { tipo?: 'RG'|'CPF'|'PASSAPORTE'; numero?: string };
  endereco?: { pais?: string; estado?: string; cidade?: string; bairro?: string; rua?: string; cep?: string };
  createdAt?: string;
  updatedAt?: string;
};

export type Dependente = {
  id: string;
  titularId: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento?: string;
  documento?: { tipo?: 'RG'|'CPF'|'PASSAPORTE'; numero?: string };
};

export type Acomodacao = { id: string; nome: string; capacidade: number; descricao?: string };
export type Hospedagem = { id: string; titularId: string; acomodacaoId: string; checkin: string; checkout?: string };

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...init });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (res.status === 204) return undefined as unknown as T;
  return res.json();
}

export const api = {
  // Titulares
  listTitulares: () => http<Titular[]>('/titulares'),
  createTitular: (payload: Omit<Titular,'id'>) => http<Titular>('/titulares', { method: 'POST', body: JSON.stringify(payload) }),
  getTitular: (id: string) => http<Titular>(`/titulares/${id}`),
  updateTitular: (id: string, payload: Partial<Titular>) => http<Titular>(`/titulares/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteTitular: (id: string) => http<void>(`/titulares/${id}`, { method: 'DELETE' }),

  // Dependentes
  listDependentes: () => http<Dependente[]>('/dependentes'),
  createDependente: (payload: Omit<Dependente,'id'>) => http<Dependente>('/dependentes', { method: 'POST', body: JSON.stringify(payload) }),
  getDependente: (id: string) => http<Dependente>(`/dependentes/${id}`),
  updateDependente: (id: string, payload: Partial<Dependente>) => http<Dependente>(`/dependentes/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteDependente: (id: string) => http<void>(`/dependentes/${id}`, { method: 'DELETE' }),

  // Acomodações
  listAcomodacoes: () => http<Acomodacao[]>('/acomodacoes'),
  createAcomodacao: (payload: Omit<Acomodacao,'id'>) => http<Acomodacao>('/acomodacoes', { method: 'POST', body: JSON.stringify(payload) }),

  // Hospedagens
  listHospedagens: () => http<Hospedagem[]>('/hospedagens'),
  createHospedagem: (payload: Omit<Hospedagem,'id'>) => http<Hospedagem>('/hospedagens', { method: 'POST', body: JSON.stringify(payload) }),
};

export default api;
