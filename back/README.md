# Atlantis Backend (TypeScript)

Minimal Express + TypeScript API for Atlantis, with simple file-based storage.

## Run

```powershell
# from back/ folder
npm install
npm run seed   # optional sample data
npm run dev    # starts at http://localhost:3001
```

## Endpoints

- `GET /` – API info
- `GET /api/health` – healthcheck
- `CRUD /api/titulares`
- `CRUD /api/dependentes`
- `CRUD /api/acomodacoes`
- `CRUD /api/hospedagens`

## Storage
Data is stored under `src/data/store/*.json`. Replace with a DB later if needed.

## Notes
- Input validated with `zod`.
- Uses `helmet`, `cors`, `morgan`.
- Not a copy of the referenced repo; structure is simpler and uses file DB.
