import { FileDB } from '../data/db';
import { Acomodacao, Titular } from '../domain/models';
import { v4 as uuid } from 'uuid';

async function run() {
  const acomDb = new FileDB<Acomodacao>('acomodacoes');
  const titDb = new FileDB<Titular>('titulares');
  const now = new Date().toISOString();

  const acoms: Acomodacao[] = [
    { id: uuid(), nome: 'Aquário Casal Simples', capacidade: 2, descricao: 'Conforto básico para casal', createdAt: now, updatedAt: now },
    { id: uuid(), nome: 'Oceano Família Super', capacidade: 5, descricao: 'Espaçoso para família', createdAt: now, updatedAt: now }
  ];
  await acomDb.saveAll(acoms);

  const titulares: Titular[] = [
    { id: uuid(), nome: 'Fulano de Tal', createdAt: now, updatedAt: now },
    { id: uuid(), nome: 'Ciclana Silva', createdAt: now, updatedAt: now }
  ];
  await titDb.saveAll(titulares);

  console.log('Seeded with sample data');
}

run().catch(err => { console.error(err); process.exit(1); });
