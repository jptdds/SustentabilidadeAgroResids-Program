# 🌾 Sistema de Gestão de Estoque - Agroindústria
## Versão Standalone com MySQL (HTML, CSS, JavaScript, Node.js)

Um sistema web completo e elegante para controle de entrada, transformação e rastreabilidade de matérias-primas em agroindústrias.

## ✨ Características

- ✅ **Dashboard** com KPIs e últimas entradas
- ✅ **Gestão de Matérias-Primas** - Cadastro completo
- ✅ **Entrada de Estoque** - Registro com lotes e fornecedores
- ✅ **Gestão de Fornecedores** - CRUD completo
- ✅ **Histórico de Movimentações** - Rastreabilidade
- ✅ **Relatórios** - Com filtros e exportação CSV
- ✅ **Alertas** - Notificações de estoque baixo
- ✅ **Interface Elegante** - Tema verde moderno
- ✅ **Banco de Dados MySQL** - Robusto e confiável

## 🛠️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL 5.7+
- **Simples e Prático** - Fácil de instalar e usar

## 📋 Pré-requisitos

1. **Node.js 14+** (https://nodejs.org/)
2. **MySQL 5.7+** (https://www.mysql.com/downloads/)
3. **npm ou yarn** (vem com Node.js)

## 🚀 Instalação Passo a Passo

### 1. Instalar MySQL

**Windows:**
- Baixe em: https://dev.mysql.com/downloads/mysql/
- Execute o instalador
- Anote o usuário (padrão: `root`) e senha

**macOS (com Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
```

### 2. Criar o Banco de Dados

Abra o MySQL e execute:

```sql
CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Ou use a linha de comando:

```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 3. Descompactar o Projeto

```bash
unzip agroindustria-standalone-fixed.zip -d C:\Users\Aluno\agroindustria
cd C:\Users\Aluno\agroindustria
```

### 4. Configurar Conexão MySQL

Abra o arquivo `.env` e configure:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=agroindustria_db
PORT=3000
```

**Exemplos:**
- Se não tem senha MySQL: deixe `DB_PASSWORD=` em branco
- Se MySQL está em outro host: mude `DB_HOST`
- Se usa porta diferente: adicione `DB_PORT=3307`

### 5. Instalar Dependências

```bash
npm install
```

### 6. Iniciar o Servidor

```bash
npm start
```

Você verá:
```
╔════════════════════════════════════════════════════════════╗
║   🌾 Sistema de Gestão de Estoque - Agroindústria        ║
║                                                            ║
║   ✅ Servidor rodando em: http://localhost:3000           ║
║   📊 Banco de dados: MySQL                                ║
║   🔌 Host: localhost                                       ║
║   📦 Database: agroindustria_db                           ║
║                                                            ║
║   Abra o navegador e acesse: http://localhost:3000        ║
╚════════════════════════════════════════════════════════════╝
```

### 7. Acessar no Navegador

```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
agroindustria-standalone/
├── .env                  ← Configurações MySQL (EDITE AQUI!)
├── .env.example          ← Exemplo de configuração
├── server.js             ← Servidor Node.js com Express
├── package.json          ← Dependências
├── README.md             ← Este arquivo
└── public/
    ├── index.html        ← Interface
    ├── styles.css        ← Estilos
    └── app.js            ← JavaScript
```

## 🗄️ Banco de Dados

O sistema cria automaticamente as seguintes tabelas no MySQL:

| Tabela | Descrição |
|--------|-----------|
| `raw_materials` | Matérias-primas |
| `suppliers` | Fornecedores |
| `stock_entries` | Entradas de estoque |
| `stock_movements` | Histórico de movimentações |
| `stock_alerts` | Alertas de estoque |

## 🎯 Como Usar

### 1. Dashboard
- Visualize KPIs em tempo real
- Veja as últimas entradas de estoque
- Acompanhe alertas críticos

### 2. Matérias-Primas
- Clique em "+ Nova Matéria-Prima"
- Preencha os dados (nome, categoria, unidade, estoque mín/máx)
- Salve para adicionar ao sistema

### 3. Entrada de Estoque
- Clique em "+ Novo Recebimento"
- Selecione a matéria-prima e fornecedor
- Preencha quantidade, lote, data e vencimento
- O estoque será atualizado automaticamente

### 4. Fornecedores
- Clique em "+ Novo Fornecedor"
- Preencha dados da empresa (nome, email, telefone, CNPJ)
- Salve para usar nas entradas

### 5. Movimentações
- Visualize o histórico de todas as movimentações
- Veja tipo (entrada/saída), quantidade e data

### 6. Relatórios
- Filtre por data inicial, data final e matéria-prima
- Clique em "Gerar Relatório" para visualizar
- Clique em "📥 Exportar CSV" para baixar em Excel

### 7. Alertas
- Clique em "🔍 Verificar Alertas" para gerar alertas
- Veja matérias-primas com estoque baixo
- Tome ações preventivas

## 🔧 Troubleshooting

### Erro: "connect ECONNREFUSED 127.0.0.1:3306"

**Problema:** MySQL não está rodando

**Solução:**
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Erro: "Access denied for user 'root'@'localhost'"

**Problema:** Senha do MySQL está incorreta

**Solução:**
1. Abra o arquivo `.env`
2. Verifique o `DB_PASSWORD`
3. Tente a senha que usou ao instalar MySQL

### Erro: "Unknown database 'agroindustria_db'"

**Problema:** Banco de dados não foi criado

**Solução:**
```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"
```

### Porta 3000 já está em uso

**Problema:** Outro programa está usando a porta 3000

**Solução:**
1. Abra o arquivo `.env`
2. Mude `PORT=3001` (ou outra porta)
3. Reinicie o servidor

### Nada aparece no navegador

**Verificação:**
1. Servidor está rodando? (vê a mensagem no terminal?)
2. Tente `http://localhost:3000` (com http, não https)
3. Abra o console do navegador (F12) para ver erros

## 📊 Exemplos de Uso

### Exemplo 1: Cadastrar Matéria-Prima
1. Clique em "📦 Matérias-Primas"
2. Clique em "+ Nova Matéria-Prima"
3. Preencha:
   - Nome: "Milho"
   - Categoria: "Grão"
   - Unidade: "kg"
   - Estoque Mínimo: "100"
   - Estoque Máximo: "5000"
   - Custo Unitário: "2.50"
4. Clique em "Salvar"

### Exemplo 2: Registrar Entrada
1. Clique em "📥 Entrada de Estoque"
2. Clique em "+ Novo Recebimento"
3. Preencha:
   - Matéria-Prima: "Milho"
   - Fornecedor: "Fornecedor A"
   - Quantidade: "1000"
   - Lote: "LOTE-001-2024"
   - Data: "29/01/2024"
   - Custo Unitário: "2.50"
4. Clique em "Salvar"
5. O estoque será atualizado automaticamente!

### Exemplo 3: Gerar Relatório
1. Clique em "📈 Relatórios"
2. Selecione data inicial e final
3. (Opcional) Selecione uma matéria-prima específica
4. Clique em "Gerar Relatório"
5. Para exportar: Clique em "📥 Exportar CSV"

## 🔒 Segurança

Este é um sistema de desenvolvimento/pequena escala. Para produção:
- Adicione autenticação de usuários
- Use HTTPS
- Implemente validação de dados no backend
- Use senhas fortes no MySQL
- Faça backups regulares

## 📞 Suporte

Para dúvidas:

1. **Verificar Node.js:**
   ```bash
   node --version
   npm --version
   ```

2. **Verificar MySQL:**
   ```bash
   mysql --version
   mysql -u root -p -e "SELECT 1"
   ```

3. **Verificar arquivo .env:**
   - Abra `.env` e confirme as configurações
   - Teste a conexão MySQL manualmente

4. **Ver logs do servidor:**
   - Abra o terminal onde o servidor está rodando
   - Procure por mensagens de erro

## 🚀 Próximos Passos

1. **Adicionar Autenticação** - Proteja com login
2. **Integração com Excel** - Importe dados em lote
3. **Backup Automático** - Faça backup do banco de dados
4. **Notificações por Email** - Receba alertas por email
5. **Integração com Nota Fiscal** - Conecte com sistemas de NF-e

## 📄 Licença

Livre para uso pessoal e comercial.

## 🎉 Pronto para Usar!

```bash
# 1. Descompactar
unzip agroindustria-standalone-fixed.zip

# 2. Configurar .env com dados do MySQL
# (edite o arquivo .env)

# 3. Instalar
npm install

# 4. Rodar
npm start

# 5. Acessar
# http://localhost:3000
```

---

**Desenvolvido com ❤️ para Agroindústrias**

Versão: 1.0.0 | Janeiro 2024 | MySQL Edition
