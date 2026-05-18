import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function seed() {
  console.log('Iniciando seed de equipamentos, clientes e categorias...');

  // Equipamentos de exemplo
  const equipments = [
    {
      user_id: 'default_user',
      name: 'Betoneira 400L',
      code: 'BET-400',
      stock_available: 5,
      stock_maintenance: 0,
      lots: [{ lot_number: '01', quantity: 5 }]
    },
    {
      user_id: 'default_user',
      name: 'Andaime',
      code: 'AND-001',
      stock_available: 10,
      stock_maintenance: 0,
      lots: [{ lot_number: 'A1', quantity: 10 }]
    }
  ];

  const { data: eqData, error: eqErr } = await supabase.from('equipments').insert(equipments);
  if (eqErr) console.error('Erro ao inserir equipamentos:', eqErr);
  else console.log('Equipamentos inseridos:', eqData?.length);

  // Clientes de exemplo
  const customers = [
    {
      user_id: 'default_user',
      name: 'Construtora Alpha',
      phone: '8199999999',
      email: 'contato@alpha.com.br'
    },
    {
      user_id: 'default_user',
      name: 'Engenharia Beta',
      phone: '8198888888',
      email: 'contato@beta.com.br'
    }
  ];

  const { data: custData, error: custErr } = await supabase.from('customers').insert(customers);
  if (custErr) console.error('Erro ao inserir clientes:', custErr);
  else console.log('Clientes inseridos:', custData?.length);

  // Categorias de exemplo (despesa, receita, equipamento)
  const categories = [
    { user_id: 'default_user', name: 'Aluguel', type: 'income' },
    { user_id: 'default_user', name: 'Manutenção', type: 'expense' },
    { user_id: 'default_user', name: 'Equipamento', type: 'equipment' }
  ];

  const { data: catData, error: catErr } = await supabase.from('categories').insert(categories);
  if (catErr) console.error('Erro ao inserir categorias:', catErr);
  else console.log('Categorias inseridas:', catData?.length);

  console.log('Seed concluído.');
}

seed();
