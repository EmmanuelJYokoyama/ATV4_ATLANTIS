export interface Titular {
  id: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento?: string;
  telefoneCelular?: string;
  telefoneResidencial?: string;
  endereco?: { pais?: string; estado?: string; cidade?: string; bairro?: string; rua?: string; cep?: string };
  documento?: { tipo?: 'RG'|'CPF'|'PASSAPORTE'; numero?: string };
  createdAt: string;
  updatedAt: string;
}

export interface Dependente {
  id: string;
  titularId: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento?: string;
  documento?: { tipo?: 'RG'|'CPF'|'PASSAPORTE'; numero?: string };
  createdAt: string;
  updatedAt: string;
}

export interface Acomodacao {
  id: string;
  nome: string;
  capacidade: number;
  descricao?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hospedagem {
  id: string;
  titularId: string;
  acomodacaoId: string;
  checkin: string;
  checkout?: string;
  createdAt: string;
  updatedAt: string;
}
