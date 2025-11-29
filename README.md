# Parque Aquático ATLANTIS
## 1. Requisitos

- Node.js 18+ (recomendado LTS)
- NPM 8+ (vem com Node)
- Git (para clonar o repositório)

Verifique versões:
```powershell
node -v
npm -v
```

## 2. Clonar o Projeto
```powershell
git clone https://github.com/EmmanuelJYokoyama/ATV4_ATLANTIS
cd ATV4_ATLANTIS
```

## 3. Estrutura de Pastas
```
ATV4_ATLANTIS/
  back/        -> API Express + TypeScript
  front/       -> Aplicação React + PrimeReact
```

## 4. Backend (API)
Entre na pasta `back` e instale dependências:
```powershell
cd back
npm install
```
Dependências principais (já listadas no package.json, caso precise reinstalar):
```powershell
npm install express cors helmet morgan zod uuid
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/cors @types/uuid
```

### 4.1 Scripts úteis
Para desenvolvimento (reinicia a cada alteração):
```powershell
npm run dev
```
### 4.2 Porta
A API roda em `http://localhost:3005` (rotas base: `/api`).

### 4.3 Persistência
- Armazenamento em arquivos JSON em `back/src/data/store/`.
- Migração automática de diretório legado caso exista.

Titulares:
- `GET /titulares` – Lista titulares
- `GET /titulares/:id` – Obtém titular por ID
- `POST /titulares` – Cria titular (createdAt/updatedAt gerado no servidor)
- `PUT /titulares/:id` – Atualiza titular (updatedAt redefinido para agora)
- `DELETE /titulares/:id` – Remove titular

Dependentes:
- `GET /dependentes`
- `GET /dependentes/:id`
- `POST /dependentes`
- `PUT /dependentes/:id`
- `DELETE /dependentes/:id`

Acomodações:
- `GET /acomodacoes`
- `POST /acomodacoes`

Hospedagens:
- `GET /hospedagens`
- `POST /hospedagens`

### 4.5 Validação
- Zod utilizado para validar payloads (ver `titulares.ts` para exemplo do schema).

### 4.6 Campos Automáticos
- `createdAt`: sempre definido para a data/hora atual no momento da criação.
- `updatedAt`: redefinido a cada operação de update.

## 5. Frontend (React)
Instale dependências:
```powershell
cd ../front
npm install
```
Dependências principais (caso precise):
```powershell
npm install primereact primeicons primeflex
```

### 5.1 Rodar o Frontend
```powershell
npm start
```
Roda em `http://localhost:3000`.

### 5.2 Integração com API
- Base URL: `http://localhost:3005/api`.
- Arquivo de serviço: `front/src/services/api.ts`.
- Pode usar variável de ambiente `REACT_APP_API_URL` se desejar:
```powershell
$env:REACT_APP_API_URL="http://localhost:3005/api"; npm start
```

## 6. Fluxos Principais
1. Cadastro de Titular (gera automaticamente `createdAt`).
2. Edição de Titular com carregamento de endereço + telefones.
3. Cadastro de Dependente associado a Titular.
4. Listagens de titulares, dependentes, acomodação e hospedagem com navegação por ID.
5. Visualização de detalhes (`titular-info/:id`, `dependente-info/:id`).

## 7. Telefones e Datas
- Telefones separados em `telefoneCelular` e `telefoneResidencial`.
- Data de cadastro exibida como somente leitura nas telas de criação/edição.

## 8. Ajuste/Remoção de Favicon
- Removido ícone padrão via `<link rel="icon" href="data:," />` em `front/public/index.html`.
- Para adicionar novo favicon: coloque o arquivo em `public/` e substitua pelo caminho.

## 9. Comandos Rápidos (Resumo)
Instalação completa:
```powershell
# Backend
cd back
npm install
npm install express cors helmet morgan zod uuid
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/cors @types/uuid
npm run dev
```
Em outra janela (ou terminal):
```powershell
# Frontend
cd front
npm install
npm install primereact primeicons primeflex
npm start
```

