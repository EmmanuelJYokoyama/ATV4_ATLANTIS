import { Router } from 'express';
import { router as titulares } from './titulares';
import { router as dependentes } from './dependentes';
import { router as acomodacoes } from './acomodacoes';
import { router as hospedagens } from './hospedagens';

export const router = Router();
router.get('/health', (_req, res) => res.json({ ok: true }));
router.use('/titulares', titulares);
router.use('/dependentes', dependentes);
router.use('/acomodacoes', acomodacoes);
router.use('/hospedagens', hospedagens);
