import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function clearAll() {
  console.log('Cleaning tables...');
  const tables = ['equipments', 'customers', 'categories', 'orders', 'transactions', 'maintenance'];
  for (const tbl of tables) {
    const { error, count } = await supabase
      .from(tbl)
      .delete()
      .neq('id', '0') // delete all rows (id is UUID, none equal to '0')
      .select('id', { count: 'exact', head: true });
    if (error) console.error(`Error clearing ${tbl}:`, error);
    else console.log(`Cleared ${tbl}, rows removed: ${count}`);
  }
  console.log('All tables cleaned.');
}

clearAll();
