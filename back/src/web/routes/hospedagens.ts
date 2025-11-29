import { Router } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { FileDB } from '../../data/db';
import { Hospedagem } from '../../domain/models';

const db = new FileDB<Hospedagem>('hospedagens');
export const router = Router();

const schema = z.object({
  titularId: z.string().min(1),
  acomodacaoId: z.string().min(1),
  checkin: z.string().min(1),
  checkout: z.string().optional()
});

router.get('/', async (_req, res) => { res.json(await db.all()); });
router.get('/:id', async (req, res) => { const h = await db.get(req.params.id); if (!h) return res.status(404).json({ error: 'not found' }); res.json(h); });
router.post('/', async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format()});
  const now = new Date().toISOString();
  const novo: Hospedagem = { id: uuid(), createdAt: now, updatedAt: now, ...parsed.data };
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
