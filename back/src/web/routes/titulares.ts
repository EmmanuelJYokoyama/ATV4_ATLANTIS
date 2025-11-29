import { Router } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { FileDB } from '../../data/db';
import { Titular } from '../../domain/models';

const db = new FileDB<Titular>('titulares');
export const router = Router();

const titularSchema = z.object({
  nome: z.string().min(1),
  nomeSocial: z.string().optional(),
  dataNascimento: z.string().optional(),
  telefoneCelular: z.string().optional(),
  telefoneResidencial: z.string().optional(),
  endereco: z.object({
    pais: z.string().optional(), estado: z.string().optional(), cidade: z.string().optional(), bairro: z.string().optional(), rua: z.string().optional(), cep: z.string().optional()
  }).optional(),
  documento: z.object({ tipo: z.enum(['RG','CPF','PASSAPORTE']).optional(), numero: z.string().optional() }).optional()
});

router.get('/', async (_req, res) => { res.json(await db.all()); });
router.get('/:id', async (req, res) => { const t = await db.get(req.params.id); if (!t) return res.status(404).json({ error: 'not found' }); res.json(t); });
router.post('/', async (req, res) => {
  const parsed = titularSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format()});
  const now = new Date().toISOString();
  const novo: Titular = { id: uuid(), createdAt: now, updatedAt: now, ...parsed.data };
  await db.insert(novo);
  res.status(201).json(novo);
});
router.put('/:id', async (req, res) => {
  const existing = await db.get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  const parsed = titularSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format()});
  const now = new Date().toISOString();
  const updated = await db.update(req.params.id, { ...parsed.data, updatedAt: now, createdAt: existing.createdAt });
  res.json(updated);
});
router.delete('/:id', async (req, res) => {
  const ok = await db.delete(req.params.id);
  res.status(ok ? 204 : 404).end();
});
