import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Set this env variable to the UUID of the user you are testing with.
// Example: SEED_USER_ID=6cd6ba80-7c5d-4a5b-84a5-08b49a9f8f7f
const userId = process.env.SEED_USER_ID;

if (!userId) {
  console.error('⚠️  SEED_USER_ID not defined in .env – please add it and run again.');
  process.exit(1);
}

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function seed() {
  console.log('🔧  Starting seed for user', userId);

  // ---- Equipamentos ----
  const equipments = [
    {
      user_id: userId,
      name: 'Betoneira 400L',
      code: 'BET-400',
      stock_available: 5,
      stock_maintenance: 0,
      lots: [{ lot_number: '01', quantity: 5 }]
    },
    {
      user_id: userId,
      name: 'Andaime',
      code: 'AND-001',
      stock_available: 8,
      stock_maintenance: 0,
      lots: [{ lot_number: 'A1', quantity: 8 }]
    }
  ];
  const { error: eqErr } = await supabase.from('equipments').insert(equipments);
  if (eqErr) console.error('❌ Equipments error:', eqErr);
  else console.log('✅ Equipments inserted');

  // ---- Clientes ----
  const customers = [
    { user_id: userId, name: 'GEISE CAROLINE', phone: '8199999999', email: 'geise@example.com' },
    { user_id: userId, name: 'MARIA SILVA', phone: '8200000000', email: 'maria@example.com' }
  ];
  const { error: custErr } = await supabase.from('customers').insert(customers);
  if (custErr) console.error('❌ Customers error:', custErr);
  else console.log('✅ Customers inserted');

  // ---- Categorias ----
  const categories = [
    { user_id: userId, name: 'Aluguel', type: 'income' },
    { user_id: userId, name: 'Manutenção', type: 'expense' },
    { user_id: userId, name: 'Equipamento', type: 'equipment' }
  ];
  const { error: catErr } = await supabase.from('categories').insert(categories);
  if (catErr) console.error('❌ Categories error:', catErr);
  else console.log('✅ Categories inserted');

  console.log('🚀  Seed completed');
}

seed();
