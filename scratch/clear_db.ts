import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis do .env na raiz do projeto
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltando VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearData() {
  const tables = [
    'deliveries',
    'transactions',
    'maintenance',
    'orders',
    'equipments',
    'customers',
    'categories'
  ];

  console.log('Iniciando limpeza de dados no Supabase...');

  for (const table of tables) {
    try {
      // Usamos .neq com um UUID falso para selecionar todas as linhas e apagar
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) {
        // Ignora erro se a tabela não existir, pois pode ser que o projeto não a tenha
        if (error.code === '42P01') {
          console.log(`Tabela ${table} ignorada (não existe no banco).`);
        } else {
          console.error(`Erro ao limpar a tabela ${table}:`, error.message);
        }
      } else {
        console.log(`✓ Tabela ${table} limpa com sucesso.`);
      }
    } catch (e) {
      console.error(`Falha inesperada na tabela ${table}:`, e);
    }
  }

  console.log('\nTodos os dados foram removidos! Pode iniciar seus testes.');
}

clearData();
