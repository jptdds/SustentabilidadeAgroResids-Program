import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agroindustria_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, values = []) {
  const connection = await pool.getConnection();
  const [results] = await connection.execute(sql, values);
  connection.release();
  return results;
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando população do banco de dados...\n');

    // Limpar dados existentes
    console.log('🗑️  Limpando dados existentes...');
    await query('DELETE FROM stock_alerts');
    await query('DELETE FROM stock_movements');
    await query('DELETE FROM stock_entries');
    await query('DELETE FROM raw_materials');
    await query('DELETE FROM suppliers');
    await query('DELETE FROM users');

    // Inserir usuários
    console.log('👥 Inserindo usuários...');
    const adminPassword = hashPassword('admin123');
    await query(
      'INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      ['admin', 'admin@agroindustria.com', adminPassword, 'admin', 1]
    );
    await query(
      'INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      ['gerente', 'gerente@agroindustria.com', adminPassword, 'admin', 1]
    );
    await query(
      'INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      ['operador1', 'operador1@agroindustria.com', adminPassword, 'operador', 1]
    );
    await query(
      'INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      ['operador2', 'operador2@agroindustria.com', adminPassword, 'operador', 1]
    );

    // Inserir fornecedores
    console.log('🏭 Inserindo fornecedores...');
    const suppliers = [
      ['Agrícola Brasil Ltda', 'contato@agricolabrasil.com.br', '(11) 3456-7890', '12.345.678/0001-90', 'Av. Paulista, 1000', 'São Paulo', 'SP'],
      ['Grãos do Centro', 'vendas@graoscentro.com.br', '(34) 9876-5432', '23.456.789/0001-01', 'Rua das Flores, 500', 'Uberlândia', 'MG'],
      ['Sementes Premium', 'comercial@sementespremium.com.br', '(47) 3333-4444', '34.567.890/0001-12', 'Estrada Rural, 200', 'Blumenau', 'SC'],
      ['Fertilizantes Globais', 'vendas@fertglobais.com.br', '(85) 9999-8888', '45.678.901/0001-23', 'Av. Industrial, 1500', 'Fortaleza', 'CE'],
      ['Insumos Agrícolas Sul', 'contato@insumoagricola.com.br', '(51) 2222-3333', '56.789.012/0001-34', 'Rua do Comércio, 300', 'Porto Alegre', 'RS']
    ];

    for (const supplier of suppliers) {
      await query(
        'INSERT INTO suppliers (name, email, phone, cnpj, address, city, state, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [...supplier, 1, 1]
      );
    }

    // Inserir matérias-primas
    console.log('📦 Inserindo matérias-primas...');
    const materials = [
      ['Milho Amarelo', 'Grãos', 'kg', 5000.00, 1000.00, 10000.00, 0.85],
      ['Soja', 'Grãos', 'kg', 3500.00, 800.00, 8000.00, 1.20],
      ['Trigo', 'Grãos', 'kg', 2800.00, 500.00, 6000.00, 0.95],
      ['Arroz', 'Grãos', 'kg', 4200.00, 1000.00, 9000.00, 1.10],
      ['Nitrogênio (N)', 'Fertilizantes', 'kg', 1500.00, 300.00, 3000.00, 2.50],
      ['Fósforo (P)', 'Fertilizantes', 'kg', 1200.00, 250.00, 2500.00, 3.00],
      ['Potássio (K)', 'Fertilizantes', 'kg', 1800.00, 400.00, 3500.00, 2.75],
      ['Sementes de Milho Híbrido', 'Sementes', 'kg', 800.00, 150.00, 2000.00, 8.50],
      ['Sementes de Soja', 'Sementes', 'kg', 600.00, 100.00, 1500.00, 9.20],
      ['Sementes de Trigo', 'Sementes', 'kg', 450.00, 80.00, 1200.00, 7.80],
      ['Calcário Agrícola', 'Aditivos', 'kg', 2500.00, 500.00, 5000.00, 0.45],
      ['Enxofre', 'Aditivos', 'kg', 1000.00, 200.00, 2500.00, 1.80],
      ['Micronutrientes', 'Aditivos', 'kg', 300.00, 50.00, 800.00, 15.00]
    ];

    for (const material of materials) {
      await query(
        'INSERT INTO raw_materials (name, category, unit, current_stock, minimum_stock, maximum_stock, unit_cost, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [...material, 1, 1]
      );
    }

    // Inserir entradas de estoque
    console.log('📥 Inserindo entradas de estoque...');
    const entries = [
      [1, 1, 2000.00, 'kg', 'LOTE-MILHO-001-2024', '2024-01-15', '2025-01-15', 0.85, 1700.00, 'Milho de qualidade premium'],
      [2, 2, 1500.00, 'kg', 'LOTE-SOJA-001-2024', '2024-01-18', '2025-01-18', 1.20, 1800.00, 'Soja certificada'],
      [3, 1, 1200.00, 'kg', 'LOTE-TRIGO-001-2024', '2024-01-20', '2025-01-20', 0.95, 1140.00, 'Trigo tipo 1'],
      [4, 3, 1800.00, 'kg', 'LOTE-ARROZ-001-2024', '2024-01-22', '2025-01-22', 1.10, 1980.00, 'Arroz integral'],
      [5, 4, 500.00, 'kg', 'LOTE-NITRO-001-2024', '2024-01-25', '2025-01-25', 2.50, 1250.00, 'Nitrogênio puro'],
      [6, 4, 400.00, 'kg', 'LOTE-FOSF-001-2024', '2024-01-25', '2025-01-25', 3.00, 1200.00, 'Fósforo puro'],
      [7, 4, 600.00, 'kg', 'LOTE-POTASS-001-2024', '2024-01-25', '2025-01-25', 2.75, 1650.00, 'Potássio puro'],
      [8, 3, 300.00, 'kg', 'LOTE-SEMILHO-001-2024', '2024-02-01', '2025-02-01', 8.50, 2550.00, 'Sementes híbridas certificadas'],
      [9, 3, 250.00, 'kg', 'LOTE-SEMSOJA-001-2024', '2024-02-01', '2025-02-01', 9.20, 2300.00, 'Sementes de soja certificadas'],
      [10, 3, 200.00, 'kg', 'LOTE-SEMTRIGO-001-2024', '2024-02-01', '2025-02-01', 7.80, 1560.00, 'Sementes de trigo certificadas'],
      [11, 5, 1000.00, 'kg', 'LOTE-CALC-001-2024', '2024-02-05', '2025-02-05', 0.45, 450.00, 'Calcário dolomítico'],
      [12, 5, 400.00, 'kg', 'LOTE-ENXO-001-2024', '2024-02-05', '2025-02-05', 1.80, 720.00, 'Enxofre em pó'],
      [13, 4, 150.00, 'kg', 'LOTE-MICRO-001-2024', '2024-02-10', '2025-02-10', 15.00, 2250.00, 'Micronutrientes complexos']
    ];

    for (const entry of entries) {
      await query(
        'INSERT INTO stock_entries (raw_material_id, supplier_id, quantity, unit, lot_number, entry_date, expiry_date, unit_cost, total_cost, notes, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [...entry, 1]
      );
    }

    // Inserir movimentações
    console.log('🔄 Inserindo movimentações...');
    const movements = [
      [1, 'entrada', 2000.00, 'kg', 'Entrada de estoque'],
      [2, 'entrada', 1500.00, 'kg', 'Entrada de estoque'],
      [3, 'entrada', 1200.00, 'kg', 'Entrada de estoque'],
      [4, 'entrada', 1800.00, 'kg', 'Entrada de estoque'],
      [1, 'saida', 150.00, 'kg', 'Uso em processamento'],
      [2, 'saida', 100.00, 'kg', 'Uso em processamento'],
      [3, 'saida', 80.00, 'kg', 'Uso em processamento'],
      [5, 'entrada', 500.00, 'kg', 'Entrada de estoque'],
      [6, 'entrada', 400.00, 'kg', 'Entrada de estoque'],
      [7, 'entrada', 600.00, 'kg', 'Entrada de estoque']
    ];

    for (const movement of movements) {
      await query(
        'INSERT INTO stock_movements (raw_material_id, type, quantity, unit, reason, created_by) VALUES (?, ?, ?, ?, ?, ?)',
        [...movement, 1]
      );
    }

    // Inserir alertas
    console.log('⚠️  Inserindo alertas...');
    await query(
      'INSERT INTO stock_alerts (raw_material_id, alert_type, message, is_resolved) VALUES (?, ?, ?, ?)',
      [10, 'low_stock', 'Estoque de Sementes de Trigo abaixo do mínimo', 0]
    );
    await query(
      'INSERT INTO stock_alerts (raw_material_id, alert_type, message, is_resolved) VALUES (?, ?, ?, ?)',
      [13, 'low_stock', 'Estoque de Micronutrientes abaixo do mínimo', 0]
    );

    console.log('\n✅ Banco de dados populado com sucesso!\n');
    console.log('📋 Dados inseridos:');
    console.log('   - 4 usuários');
    console.log('   - 5 fornecedores');
    console.log('   - 13 matérias-primas');
    console.log('   - 13 entradas de estoque');
    console.log('   - 10 movimentações');
    console.log('   - 2 alertas\n');
    console.log('🔐 Credenciais de acesso:');
    console.log('   Username: admin | Senha: admin123');
    console.log('   Username: gerente | Senha: admin123');
    console.log('   Username: operador1 | Senha: admin123');
    console.log('   Username: operador2 | Senha: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error.message);
    process.exit(1);
  }
}

seedDatabase();
