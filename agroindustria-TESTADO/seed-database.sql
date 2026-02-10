-- ========================================
-- SCRIPT DE POPULAÇÃO DO BANCO DE DADOS
-- Sistema de Gestão de Estoque - Agroindústria
-- ========================================

-- Limpar dados existentes (opcional)
-- DELETE FROM stock_alerts;
-- DELETE FROM stock_movements;
-- DELETE FROM stock_entries;
-- DELETE FROM raw_materials;
-- DELETE FROM suppliers;
-- DELETE FROM users;

-- ========================================
-- INSERIR USUÁRIOS
-- ========================================

INSERT INTO users (username, email, password, role, is_active) VALUES
('admin', 'admin@agroindustria.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin', 1),
('gerente', 'gerente@agroindustria.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin', 1),
('operador1', 'operador1@agroindustria.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'operador', 1),
('operador2', 'operador2@agroindustria.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'operador', 1);

-- ========================================
-- INSERIR FORNECEDORES
-- ========================================

INSERT INTO suppliers (name, email, phone, cnpj, address, city, state, is_active, created_by) VALUES
('Agrícola Brasil Ltda', 'contato@agricolabrasil.com.br', '(11) 3456-7890', '12.345.678/0001-90', 'Av. Paulista, 1000', 'São Paulo', 'SP', 1, 1),
('Grãos do Centro', 'vendas@graoscentro.com.br', '(34) 9876-5432', '23.456.789/0001-01', 'Rua das Flores, 500', 'Uberlândia', 'MG', 1, 1),
('Sementes Premium', 'comercial@sementespremium.com.br', '(47) 3333-4444', '34.567.890/0001-12', 'Estrada Rural, 200', 'Blumenau', 'SC', 1, 1),
('Fertilizantes Globais', 'vendas@fertglobais.com.br', '(85) 9999-8888', '45.678.901/0001-23', 'Av. Industrial, 1500', 'Fortaleza', 'CE', 1, 1),
('Insumos Agrícolas Sul', 'contato@insumoagricola.com.br', '(51) 2222-3333', '56.789.012/0001-34', 'Rua do Comércio, 300', 'Porto Alegre', 'RS', 1, 1);

-- ========================================
-- INSERIR MATÉRIAS-PRIMAS
-- ========================================

INSERT INTO raw_materials (name, category, unit, current_stock, minimum_stock, maximum_stock, unit_cost, is_active, created_by) VALUES
-- Grãos
('Milho Amarelo', 'Grãos', 'kg', 5000.00, 1000.00, 10000.00, 0.85, 1, 1),
('Soja', 'Grãos', 'kg', 3500.00, 800.00, 8000.00, 1.20, 1, 1),
('Trigo', 'Grãos', 'kg', 2800.00, 500.00, 6000.00, 0.95, 1, 1),
('Arroz', 'Grãos', 'kg', 4200.00, 1000.00, 9000.00, 1.10, 1, 1),

-- Fertilizantes
('Nitrogênio (N)', 'Fertilizantes', 'kg', 1500.00, 300.00, 3000.00, 2.50, 1, 1),
('Fósforo (P)', 'Fertilizantes', 'kg', 1200.00, 250.00, 2500.00, 3.00, 1, 1),
('Potássio (K)', 'Fertilizantes', 'kg', 1800.00, 400.00, 3500.00, 2.75, 1, 1),

-- Sementes
('Sementes de Milho Híbrido', 'Sementes', 'kg', 800.00, 150.00, 2000.00, 8.50, 1, 1),
('Sementes de Soja', 'Sementes', 'kg', 600.00, 100.00, 1500.00, 9.20, 1, 1),
('Sementes de Trigo', 'Sementes', 'kg', 450.00, 80.00, 1200.00, 7.80, 1, 1),

-- Aditivos
('Calcário Agrícola', 'Aditivos', 'kg', 2500.00, 500.00, 5000.00, 0.45, 1, 1),
('Enxofre', 'Aditivos', 'kg', 1000.00, 200.00, 2500.00, 1.80, 1, 1),
('Micronutrientes', 'Aditivos', 'kg', 300.00, 50.00, 800.00, 15.00, 1, 1);

-- ========================================
-- INSERIR ENTRADAS DE ESTOQUE
-- ========================================

INSERT INTO stock_entries (raw_material_id, supplier_id, quantity, unit, lot_number, entry_date, expiry_date, unit_cost, total_cost, notes, created_by) VALUES
(1, 1, 2000.00, 'kg', 'LOTE-MILHO-001-2024', '2024-01-15', '2025-01-15', 0.85, 1700.00, 'Milho de qualidade premium', 1),
(2, 2, 1500.00, 'kg', 'LOTE-SOJA-001-2024', '2024-01-18', '2025-01-18', 1.20, 1800.00, 'Soja certificada', 1),
(3, 1, 1200.00, 'kg', 'LOTE-TRIGO-001-2024', '2024-01-20', '2025-01-20', 0.95, 1140.00, 'Trigo tipo 1', 1),
(4, 3, 1800.00, 'kg', 'LOTE-ARROZ-001-2024', '2024-01-22', '2025-01-22', 1.10, 1980.00, 'Arroz integral', 1),
(5, 4, 500.00, 'kg', 'LOTE-NITRO-001-2024', '2024-01-25', '2025-01-25', 2.50, 1250.00, 'Nitrogênio puro', 1),
(6, 4, 400.00, 'kg', 'LOTE-FOSF-001-2024', '2024-01-25', '2025-01-25', 3.00, 1200.00, 'Fósforo puro', 1),
(7, 4, 600.00, 'kg', 'LOTE-POTASS-001-2024', '2024-01-25', '2025-01-25', 2.75, 1650.00, 'Potássio puro', 1),
(8, 3, 300.00, 'kg', 'LOTE-SEMILHO-001-2024', '2024-02-01', '2025-02-01', 8.50, 2550.00, 'Sementes híbridas certificadas', 1),
(9, 3, 250.00, 'kg', 'LOTE-SEMSOJA-001-2024', '2024-02-01', '2025-02-01', 9.20, 2300.00, 'Sementes de soja certificadas', 1),
(10, 3, 200.00, 'kg', 'LOTE-SEMTRIGO-001-2024', '2024-02-01', '2025-02-01', 7.80, 1560.00, 'Sementes de trigo certificadas', 1),
(11, 5, 1000.00, 'kg', 'LOTE-CALC-001-2024', '2024-02-05', '2025-02-05', 0.45, 450.00, 'Calcário dolomítico', 1),
(12, 5, 400.00, 'kg', 'LOTE-ENXO-001-2024', '2024-02-05', '2025-02-05', 1.80, 720.00, 'Enxofre em pó', 1),
(13, 4, 150.00, 'kg', 'LOTE-MICRO-001-2024', '2024-02-10', '2025-02-10', 15.00, 2250.00, 'Micronutrientes complexos', 1);

-- ========================================
-- INSERIR MOVIMENTAÇÕES
-- ========================================

INSERT INTO stock_movements (raw_material_id, type, quantity, unit, reason, created_by) VALUES
(1, 'entrada', 2000.00, 'kg', 'Entrada de estoque', 1),
(2, 'entrada', 1500.00, 'kg', 'Entrada de estoque', 1),
(3, 'entrada', 1200.00, 'kg', 'Entrada de estoque', 1),
(4, 'entrada', 1800.00, 'kg', 'Entrada de estoque', 1),
(1, 'saida', 150.00, 'kg', 'Uso em processamento', 2),
(2, 'saida', 100.00, 'kg', 'Uso em processamento', 2),
(3, 'saida', 80.00, 'kg', 'Uso em processamento', 2),
(5, 'entrada', 500.00, 'kg', 'Entrada de estoque', 1),
(6, 'entrada', 400.00, 'kg', 'Entrada de estoque', 1),
(7, 'entrada', 600.00, 'kg', 'Entrada de estoque', 1);

-- ========================================
-- INSERIR ALERTAS (Opcional)
-- ========================================

INSERT INTO stock_alerts (raw_material_id, alert_type, message, is_resolved) VALUES
(10, 'low_stock', 'Estoque de Sementes de Trigo abaixo do mínimo', 0),
(13, 'low_stock', 'Estoque de Micronutrientes abaixo do mínimo', 0);

-- ========================================
-- VERIFICAR DADOS INSERIDOS
-- ========================================

SELECT 'Usuários' as Tabela, COUNT(*) as Total FROM users
UNION ALL
SELECT 'Fornecedores', COUNT(*) FROM suppliers
UNION ALL
SELECT 'Matérias-Primas', COUNT(*) FROM raw_materials
UNION ALL
SELECT 'Entradas de Estoque', COUNT(*) FROM stock_entries
UNION ALL
SELECT 'Movimentações', COUNT(*) FROM stock_movements
UNION ALL
SELECT 'Alertas', COUNT(*) FROM stock_alerts;

-- ========================================
-- DADOS PADRÃO PARA LOGIN
-- ========================================
-- Username: admin | Senha: admin123
-- Username: gerente | Senha: admin123
-- Username: operador1 | Senha: admin123
-- Username: operador2 | Senha: admin123
