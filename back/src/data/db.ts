import { promises as fs } from 'fs';
import path from 'path';

// New canonical data directory using __dirname to avoid duplicate 'back' in path
const canonicalDir = path.resolve(__dirname, 'store');
// Legacy directory (wrong path construction) for migration support
const legacyDir = path.resolve(process.cwd(), 'back', 'src', 'data', 'store');

const ensureDir = async () => {
  // Create canonical directory
  await fs.mkdir(canonicalDir, { recursive: true });
  // If legacy exists and canonical is empty, migrate files
  try {
    const legacyStat = await fs.stat(legacyDir).catch(() => null);
    if (legacyStat) {
      const canonicalFiles = await fs.readdir(canonicalDir);
      const legacyFiles = await fs.readdir(legacyDir);
      if (legacyFiles.length > 0 && canonicalFiles.length === 0) {
        for (const f of legacyFiles) {
          await fs.copyFile(path.join(legacyDir, f), path.join(canonicalDir, f));
        }
      }
    }
  } catch { /* ignore migration errors */ }
};

export type EntityName = 'titulares' | 'dependentes' | 'acomodacoes' | 'hospedagens';

export interface BaseEntity { id: string; createdAt: string; updatedAt: string; }

export class FileDB<T extends BaseEntity> {
  constructor(private entity: EntityName) {}

  private filePath() { return path.join(canonicalDir, `${this.entity}.json`); }

  async all(): Promise<T[]> { await ensureDir(); try { const raw = await fs.readFile(this.filePath(), 'utf-8'); return JSON.parse(raw) as T[]; } catch { return []; } }
  async saveAll(rows: T[]) { await ensureDir(); await fs.writeFile(this.filePath(), JSON.stringify(rows, null, 2), 'utf-8'); }

  async get(id: string) { const rows = await this.all(); return rows.find(r => r.id === id) ?? null; }
  async insert(row: T) { const rows = await this.all(); rows.push(row); await this.saveAll(rows); return row; }
  async update(id: string, patch: Partial<T>) { const rows = await this.all(); const idx = rows.findIndex(r => r.id === id); if (idx < 0) return null; rows[idx] = { ...rows[idx], ...patch, updatedAt: new Date().toISOString() } as T; await this.saveAll(rows); return rows[idx]; }
  async delete(id: string) { const rows = await this.all(); const next = rows.filter(r => r.id !== id); await this.saveAll(next); return rows.length !== next.length; }
}
