import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function clearAll() {
  console.log('Cleaning tables...');
  const tables = ['equipments', 'customers', 'categories', 'orders', 'transactions', 'maintenance'];
  for (const tbl of tables) {
    const { data, error } = await supabase
      .from(tbl)
      .delete()
      .neq('id', '0') // delete all rows (id is UUID, none equal to '0')
      .select('*');
    if (error) console.error(`Error clearing ${tbl}:`, error);
    else console.log(`Cleared ${tbl}, rows removed: ${data?.length || 0}`);
  }
  console.log('All tables cleaned.');
}

clearAll();
