# 📘 Guia Completo - Sistema de Gestão de Estoque

## 🎯 O que é este sistema?

Sistema profissional e minimalista para gestão de estoque de matérias-primas em agroindústrias, com:

✅ **Interface corporativa** - Design limpo e sério
✅ **Banco de dados pré-populado** - Dados realistas prontos para uso
✅ **Múltiplos usuários** - Com diferentes perfis de acesso
✅ **Rastreabilidade completa** - Histórico de todas as movimentações
✅ **Relatórios e alertas** - Monitoramento de estoque

---

## 🚀 Início Rápido (5 Minutos)

### 1️⃣ Criar o Banco de Dados

```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"
```

Se não tiver senha, deixe em branco.

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Popular o Banco de Dados

```bash
npm run seed
```

Este comando insere automaticamente:
- 4 usuários de teste
- 5 fornecedores
- 13 matérias-primas com estoque
- 13 entradas de estoque
- 10 movimentações
- 2 alertas

### 4️⃣ Iniciar o Servidor

```bash
npm start
```

### 5️⃣ Acessar o Sistema

Abra o navegador e vá para:
```
http://localhost:3000
```

---

## 🔐 Credenciais de Acesso

Todos os usuários têm a mesma senha: **admin123**

| Usuário | Perfil | Email |
|---------|--------|-------|
| admin | Admin | admin@agroindustria.com |
| gerente | Admin | gerente@agroindustria.com |
| operador1 | Operador | operador1@agroindustria.com |
| operador2 | Operador | operador2@agroindustria.com |

---

## 📊 Dados Pré-Populados

### Fornecedores (5)
1. **Agrícola Brasil Ltda** - São Paulo, SP
2. **Grãos do Centro** - Uberlândia, MG
3. **Sementes Premium** - Blumenau, SC
4. **Fertilizantes Globais** - Fortaleza, CE
5. **Insumos Agrícolas Sul** - Porto Alegre, RS

### Matérias-Primas (13)

**Grãos:**
- Milho Amarelo: 5.000 kg
- Soja: 3.500 kg
- Trigo: 2.800 kg
- Arroz: 4.200 kg

**Fertilizantes:**
- Nitrogênio (N): 1.500 kg
- Fósforo (P): 1.200 kg
- Potássio (K): 1.800 kg

**Sementes:**
- Sementes de Milho Híbrido: 800 kg
- Sementes de Soja: 600 kg
- Sementes de Trigo: 450 kg

**Aditivos:**
- Calcário Agrícola: 2.500 kg
- Enxofre: 1.000 kg
- Micronutrientes: 300 kg

---

## 🎨 Design e Interface

### Paleta de Cores Corporativa
- **Azul Escuro** (#1a3a52) - Cor primária
- **Branco** (#ffffff) - Fundo
- **Cinza** (#f8f9fa) - Fundo secundário
- **Vermelho** (#e74c3c) - Alertas e perigo

### Características de Design
- ✅ Minimalista e profissional
- ✅ Sem emojis (apenas ícones simples)
- ✅ Tipografia corporativa
- ✅ Espaçamento limpo
- ✅ Sombras sutis
- ✅ Responsivo para mobile

---

## 📋 Funcionalidades Principais

### 1. Dashboard
- KPIs em tempo real
- Total de matérias-primas
- Estoque total
- Alertas críticos
- Últimas entradas

### 2. Gestão de Matérias-Primas
- Cadastro de novas matérias-primas
- Edição de informações
- Exclusão de itens
- Visualização de estoque atual

### 3. Entrada de Estoque
- Registro de recebimento
- Número de lote
- Data de vencimento
- Custo unitário
- Observações

### 4. Gestão de Fornecedores
- Cadastro de fornecedores
- Informações de contato
- CNPJ e endereço
- Histórico de entregas

### 5. Movimentações
- Histórico completo de movimentações
- Tipo (entrada/saída)
- Quantidade
- Data e hora
- Usuário responsável

### 6. Relatórios
- Filtro por período
- Filtro por matéria-prima
- Filtro por fornecedor
- Exportação em CSV

### 7. Alertas
- Estoque baixo
- Estoque crítico
- Produtos vencidos (futura implementação)

---

## 🔧 Configuração Avançada

### Alterar Porta

Edite o arquivo `.env`:
```env
PORT=3001  # Mude para outra porta se necessário
```

### Alterar Credenciais do MySQL

Edite o arquivo `.env`:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=agroindustria_db
```

### Compartilhar com Outros Usuários na Rede

Descubra seu IP:
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
```

Compartilhe: `http://seu-ip:3000`

---

## 🗄️ Estrutura do Banco de Dados

### Tabelas

**users**
- id, username, email, password, role, is_active, last_login, created_at

**suppliers**
- id, name, email, phone, cnpj, address, city, state, is_active, created_by, created_at

**raw_materials**
- id, name, category, unit, current_stock, minimum_stock, maximum_stock, unit_cost, is_active, created_by, created_at

**stock_entries**
- id, raw_material_id, supplier_id, quantity, unit, lot_number, entry_date, expiry_date, unit_cost, total_cost, notes, created_by, created_at

**stock_movements**
- id, raw_material_id, type, quantity, unit, reason, created_by, created_at

**stock_alerts**
- id, raw_material_id, alert_type, message, is_resolved, created_at, resolved_at

---

## 📱 Responsividade

O sistema funciona perfeitamente em:
- ✅ Desktop (1920x1080 e acima)
- ✅ Tablet (768px a 1024px)
- ✅ Mobile (até 480px)

---

## 🔒 Segurança

- ✅ Senhas com hash SHA256
- ✅ Autenticação por token
- ✅ Proteção de rotas
- ✅ Validação de entrada
- ✅ Rastreamento de usuário

---

## 🆘 Troubleshooting

### Erro: "connect ECONNREFUSED"
MySQL não está rodando.

**Solução:**
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Erro: "Unknown database"
Banco de dados não foi criado.

**Solução:**
```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"
```

### Erro: "Access denied"
Credenciais incorretas no `.env`.

**Solução:** Verifique o arquivo `.env` e corrija username/password.

### Erro: "Port 3000 is already in use"
Outra aplicação está usando a porta.

**Solução:** Mude a porta no `.env` para 3001, 3002, 8000, etc.

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este guia
2. Verifique o arquivo `ALTERAR_PORTA.md`
3. Verifique o arquivo `SETUP_MYSQL.md`
4. Verifique os logs do servidor

---

## 🎓 Próximos Passos

1. **Explorar o Dashboard** - Veja os dados pré-populados
2. **Criar Novo Usuário** - Use a API para criar usuários adicionais
3. **Adicionar Matérias-Primas** - Cadastre novos itens
4. **Gerar Relatórios** - Teste os filtros e exportação
5. **Configurar Alertas** - Defina limites de estoque

---

**Sistema pronto para uso! 🎉**

Qualquer dúvida, consulte os arquivos de documentação inclusos.
