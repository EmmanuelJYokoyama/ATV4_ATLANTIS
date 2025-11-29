import { Router } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { FileDB } from '../../data/db';
import { Dependente } from '../../domain/models';

const db = new FileDB<Dependente>('dependentes');
export const router = Router();

const depSchema = z.object({
  titularId: z.string().min(1),
  nome: z.string().min(1),
  nomeSocial: z.string().optional(),
  dataNascimento: z.string().optional(),
  documento: z.object({ tipo: z.enum(['RG','CPF','PASSAPORTE']).optional(), numero: z.string().optional() }).optional()
});

router.get('/', async (_req, res) => { res.json(await db.all()); });
router.get('/:id', async (req, res) => { const d = await db.get(req.params.id); if (!d) return res.status(404).json({ error: 'not found' }); res.json(d); });
router.post('/', async (req, res) => {
  const parsed = depSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format()});
  const now = new Date().toISOString();
  const novo: Dependente = { id: uuid(), createdAt: now, updatedAt: now, ...parsed.data };
  await db.insert(novo);
  res.status(201).json(novo);
});
router.put('/:id', async (req, res) => {
  const updated = await db.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'not found' });
  res.json(updated);
});
router.delete('/:id', async (req, res) => {
  const ok = await db.delete(req.params.id);
  res.status(ok ? 204 : 404).end();
});
