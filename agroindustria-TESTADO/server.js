import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

// Configuração do MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agroindustria_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função para executar queries
async function query(sql, values = []) {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute(sql, values);
    connection.release();
    return results;
  } catch (error) {
    console.error('Erro na query:', error);
    throw error;
  }
}

// Função para hash de senha
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Middleware de autenticação
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Verificar token (simplificado - em produção usar JWT)
  req.userId = token;
  next();
}

// Inicializar banco de dados
async function initializeDatabase() {
  try {
    // Criar tabela de usuários
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'operador',
        is_active BOOLEAN DEFAULT 1,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar tabela de matérias-primas
    await query(`
      CREATE TABLE IF NOT EXISTS raw_materials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        current_stock DECIMAL(10, 2) DEFAULT 0,
        minimum_stock DECIMAL(10, 2) DEFAULT 0,
        maximum_stock DECIMAL(10, 2) DEFAULT 0,
        unit_cost DECIMAL(10, 2) DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Criar tabela de fornecedores
    await query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        cnpj VARCHAR(20),
        address VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(50),
        is_active BOOLEAN DEFAULT 1,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Criar tabela de entradas de estoque
    await query(`
      CREATE TABLE IF NOT EXISTS stock_entries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        raw_material_id INT NOT NULL,
        supplier_id INT,
        quantity DECIMAL(10, 2) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        lot_number VARCHAR(100),
        entry_date DATE NOT NULL,
        expiry_date DATE,
        unit_cost DECIMAL(10, 2),
        total_cost DECIMAL(12, 2),
        notes TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Criar tabela de movimentações
    await query(`
      CREATE TABLE IF NOT EXISTS stock_movements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        raw_material_id INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        reason VARCHAR(255),
        notes TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Criar tabela de alertas
    await query(`
      CREATE TABLE IF NOT EXISTS stock_alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        raw_material_id INT NOT NULL,
        alert_type VARCHAR(50) NOT NULL,
        message TEXT,
        is_resolved BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP NULL,
        FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id)
      )
    `);

    // Criar usuário padrão (admin)
    const adminExists = await query('SELECT id FROM users WHERE username = ?', ['admin']);
    if (adminExists.length === 0) {
      await query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@agroindustria.com', hashPassword('admin123'), 'admin']
      );
      console.log('✅ Usuário admin criado (username: admin, senha: admin123)');
    }

    console.log('✅ Tabelas do banco de dados criadas/verificadas');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error.message);
  }
}

// ==================== ROTAS DE AUTENTICAÇÃO ====================

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    const users = await query('SELECT * FROM users WHERE username = ? AND is_active = 1', [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const user = users[0];
    const passwordHash = hashPassword(password);

    if (user.password !== passwordHash) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    // Atualizar último login (comentado pois coluna não existe)
    // await query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    res.json({
      success: true,
      token: user.id.toString(),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar novo usuário
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    if (username.length < 4) {
      return res.status(400).json({ error: 'Username deve ter no mínimo 4 caracteres' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 8 caracteres' });
    }

    const existing = await query('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username já existe' });
    }

    const existingEmail = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingEmail.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const passwordHash = hashPassword(password);
    const result = await query(
      'INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      [username, email, passwordHash, role || 'operador', 1]
    );

    res.json({
      success: true,
      id: result.insertId,
      username,
      email,
      role: role || 'operador'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter informações do usuário logado
app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await query('SELECT id, username, email, role FROM users WHERE id = ?', [req.userId]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os usuários (apenas admin)
app.get('/api/users', requireAuth, async (req, res) => {
  try {
    const currentUser = await query('SELECT role FROM users WHERE id = ?', [req.userId]);
    if (currentUser.length === 0 || currentUser[0].role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const users = await query('SELECT id, username, email, role, is_active FROM users ORDER BY username');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar usuário (apenas admin)
app.delete('/api/users/:id', requireAuth, async (req, res) => {
  try {
    const currentUser = await query('SELECT role FROM users WHERE id = ?', [req.userId]);
    if (currentUser.length === 0 || currentUser[0].role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await query('DELETE FROM users WHERE id = ? AND id != ?', [req.params.id, req.userId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DE MATÉRIAS-PRIMAS ====================

app.get('/api/raw-materials', async (req, res) => {
  try {
    const results = await query('SELECT * FROM raw_materials ORDER BY name');
    res.json(results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/raw-materials', requireAuth, async (req, res) => {
  try {
    const { name, category, unit, minimum_stock, maximum_stock, unit_cost } = req.body;
    const result = await query(
      'INSERT INTO raw_materials (name, category, unit, minimum_stock, maximum_stock, unit_cost, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, unit, minimum_stock, maximum_stock, unit_cost, req.userId]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/raw-materials/:id', requireAuth, async (req, res) => {
  try {
    await query('DELETE FROM raw_materials WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DE FORNECEDORES ====================

app.get('/api/suppliers', async (req, res) => {
  try {
    const results = await query('SELECT * FROM suppliers ORDER BY name');
    res.json(results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/suppliers', requireAuth, async (req, res) => {
  try {
    const { name, email, phone, cnpj, address, city, state } = req.body;
    const result = await query(
      'INSERT INTO suppliers (name, email, phone, cnpj, address, city, state, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, cnpj, address, city, state, req.userId]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/suppliers/:id', requireAuth, async (req, res) => {
  try {
    await query('DELETE FROM suppliers WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DE ENTRADAS DE ESTOQUE ====================

app.get('/api/stock-entries', async (req, res) => {
  try {
    const results = await query(`
      SELECT se.*, rm.name as material_name, s.name as supplier_name, u.username as created_by_name
      FROM stock_entries se
      LEFT JOIN raw_materials rm ON se.raw_material_id = rm.id
      LEFT JOIN suppliers s ON se.supplier_id = s.id
      LEFT JOIN users u ON se.created_by = u.id
      ORDER BY se.entry_date DESC
    `);
    res.json(results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/stock-entries', requireAuth, async (req, res) => {
  try {
    const { raw_material_id, supplier_id, quantity, unit, lot_number, entry_date, expiry_date, unit_cost, notes } = req.body;
    const total_cost = quantity * (unit_cost || 0);

    const result = await query(
      'INSERT INTO stock_entries (raw_material_id, supplier_id, quantity, unit, lot_number, entry_date, expiry_date, unit_cost, total_cost, notes, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [raw_material_id, supplier_id, quantity, unit, lot_number, entry_date, expiry_date, unit_cost, total_cost, notes, req.userId]
    );

    await query(
      'UPDATE raw_materials SET current_stock = current_stock + ? WHERE id = ?',
      [quantity, raw_material_id]
    );

    await query(
      'INSERT INTO stock_movements (raw_material_id, type, quantity, unit, reason, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [raw_material_id, 'entrada', quantity, unit, 'Entrada de estoque', req.userId]
    );

    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DE MOVIMENTAÇÕES ====================

app.get('/api/stock-movements', async (req, res) => {
  try {
    const results = await query(`
      SELECT sm.*, rm.name as material_name, u.username as created_by_name
      FROM stock_movements sm
      LEFT JOIN raw_materials rm ON sm.raw_material_id = rm.id
      LEFT JOIN users u ON sm.created_by = u.id
      ORDER BY sm.created_at DESC
    `);
    res.json(results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DE ALERTAS ====================

app.get('/api/stock-alerts', async (req, res) => {
  try {
    const results = await query(`
      SELECT sa.*, rm.name as material_name, rm.current_stock
      FROM stock_alerts sa
      LEFT JOIN raw_materials rm ON sa.raw_material_id = rm.id
      WHERE sa.is_resolved = 0
      ORDER BY sa.id DESC
    `);
    res.json(results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/check-alerts', requireAuth, async (req, res) => {
  try {
    const materials = await query('SELECT * FROM raw_materials WHERE current_stock <= minimum_stock AND is_active = 1');
    
    for (const material of materials) {
      await query(
        'INSERT INTO stock_alerts (raw_material_id, alert_type, message) VALUES (?, ?, ?)',
        [material.id, 'low_stock', `Estoque baixo: ${material.name}`]
      );
    }

    res.json({ checked: materials.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ROTAS DE RELATÓRIOS ====================

app.get('/api/reports/movements', async (req, res) => {
  try {
    const { startDate, endDate, materialId } = req.query;
    let sql = 'SELECT sm.*, rm.name as material_name FROM stock_movements sm LEFT JOIN raw_materials rm ON sm.raw_material_id = rm.id WHERE 1=1';
    const params = [];

    if (startDate) {
      sql += ' AND DATE(sm.created_at) >= ?';
      params.push(startDate);
    }
    if (endDate) {
      sql += ' AND DATE(sm.created_at) <= ?';
      params.push(endDate);
    }
    if (materialId) {
      sql += ' AND sm.raw_material_id = ?';
      params.push(materialId);
    }

    sql += ' ORDER BY sm.created_at DESC';

    const results = await query(sql, params);
    res.json(results || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║   🌾 Sistema de Gestão de Estoque - Agroindústria        ║
║                                                            ║
║   ✅ Servidor rodando em: http://localhost:${PORT}        ║
║   📊 Banco de dados: MySQL                                ║
║   🔌 Host: ${process.env.DB_HOST || 'localhost'}                              ║
║   📦 Database: ${process.env.DB_NAME || 'agroindustria_db'}              ║
║                                                            ║
║   👤 Usuário padrão:                                       ║
║      Username: admin                                       ║
║      Senha: admin123                                       ║
║                                                            ║
║   Abra o navegador e acesse: http://localhost:${PORT}     ║
╚════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();
