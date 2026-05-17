import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function check() {
  const { data: orders } = await supabase.from('orders').select('*');
  const { data: tx } = await supabase.from('transactions').select('*');
  console.log('Orders:', JSON.stringify(orders, null, 2));
  console.log('Transactions:', JSON.stringify(tx, null, 2));
}
check();
