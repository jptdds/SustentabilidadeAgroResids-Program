# 🗄️ Configuração do MySQL - Sistema de Gestão de Estoque

## 📋 Índice

1. [Instalação do MySQL](#instalação-do-mysql)
2. [Criar Banco de Dados](#criar-banco-de-dados)
3. [Configurar Arquivo .env](#configurar-arquivo-env)
4. [Testar Conexão](#testar-conexão)
5. [Troubleshooting](#troubleshooting)

---

## Instalação do MySQL

### Windows

1. **Baixe o MySQL:**
   - Acesse: https://dev.mysql.com/downloads/mysql/
   - Selecione a versão mais recente (ex: 8.0.35)
   - Clique em "Download" para Windows (MSI Installer)

2. **Execute o Instalador:**
   - Abra o arquivo `.msi` baixado
   - Clique em "Next" até a tela de configuração
   - Selecione "Server Machine" (padrão)
   - Mantenha a porta padrão: **3306**

3. **Configurar Usuário:**
   - Usuário: `root` (padrão)
   - Senha: Escolha uma senha forte ou deixe em branco
   - Anote a senha! Você precisará dela.

4. **Iniciar Serviço:**
   - O MySQL deve iniciar automaticamente
   - Para verificar: Abra "Serviços" (services.msc)
   - Procure por "MySQL80" (ou versão similar)

### macOS

```bash
# Instalar com Homebrew
brew install mysql

# Iniciar o serviço
brew services start mysql

# Verificar se está rodando
mysql --version
```

### Linux (Ubuntu/Debian)

```bash
# Instalar
sudo apt-get update
sudo apt-get install mysql-server

# Iniciar serviço
sudo systemctl start mysql

# Verificar status
sudo systemctl status mysql

# (Opcional) Iniciar automaticamente
sudo systemctl enable mysql
```

---

## Criar Banco de Dados

### Opção 1: Linha de Comando (Recomendado)

```bash
# Conectar ao MySQL
mysql -u root -p

# Será pedida a senha (deixe em branco se não tiver)
```

Depois execute:

```sql
-- Criar banco de dados
CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Verificar se foi criado
SHOW DATABASES;

-- Sair
EXIT;
```

### Opção 2: Uma Linha (Sem Interatividade)

```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Opção 3: MySQL Workbench (GUI)

1. Abra o MySQL Workbench
2. Conecte ao servidor local
3. Clique em "File" → "New Query Tab"
4. Cole o comando SQL acima
5. Clique em "Execute"

---

## Configurar Arquivo .env

### Passo 1: Abra o arquivo `.env`

Procure pelo arquivo `.env` na raiz do projeto:

```
agroindustria-standalone/
├── .env              ← ESTE ARQUIVO
├── server.js
├── package.json
└── public/
```

### Passo 2: Edite as Configurações

Abra com um editor de texto (Notepad, VS Code, etc) e preencha:

```env
# ============================================
# CONFIGURAÇÃO DO BANCO DE DADOS MYSQL
# ============================================

# Host do MySQL (localhost para máquina local)
DB_HOST=localhost

# Usuário do MySQL
DB_USER=root

# Senha do MySQL (deixe em branco se não tiver)
DB_PASSWORD=

# Nome do banco de dados (que você criou acima)
DB_NAME=agroindustria_db

# Porta do MySQL (padrão: 3306)
# DB_PORT=3306

# ============================================
# CONFIGURAÇÃO DO SERVIDOR
# ============================================

# Porta do servidor Node.js
PORT=3000

# Ambiente
NODE_ENV=development
```

### Exemplos de Configuração

**Exemplo 1: Sem Senha (Padrão)**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agroindustria_db
PORT=3000
```

**Exemplo 2: Com Senha**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=minha_senha_123
DB_NAME=agroindustria_db
PORT=3000
```

**Exemplo 3: MySQL em Outro Host**
```env
DB_HOST=192.168.1.100
DB_USER=usuario_remoto
DB_PASSWORD=senha_remota
DB_NAME=agroindustria_db
DB_PORT=3306
PORT=3000
```

---

## Testar Conexão

### Teste 1: Verificar MySQL Rodando

```bash
# Windows
netstat -an | findstr 3306

# macOS/Linux
lsof -i :3306
```

Você deve ver algo como:
```
LISTEN  127.0.0.1:3306
```

### Teste 2: Conectar ao MySQL

```bash
mysql -u root -p
```

Se conectar com sucesso, você verá:
```
mysql>
```

Digite `EXIT;` para sair.

### Teste 3: Verificar Banco de Dados

```bash
mysql -u root -p -e "SHOW DATABASES;"
```

Você deve ver `agroindustria_db` na lista.

### Teste 4: Iniciar o Servidor Node.js

```bash
npm start
```

Você deve ver:
```
✅ Servidor rodando em: http://localhost:3000
📊 Banco de dados: MySQL
🔌 Host: localhost
📦 Database: agroindustria_db
```

Se vir isso, **está funcionando!** 🎉

---

## Troubleshooting

### ❌ Erro: "connect ECONNREFUSED 127.0.0.1:3306"

**Significado:** MySQL não está rodando

**Solução:**

**Windows:**
```bash
# Abra PowerShell como Administrador
net start MySQL80
```

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

### ❌ Erro: "Access denied for user 'root'@'localhost'"

**Significado:** Senha incorreta

**Solução:**

1. Abra o arquivo `.env`
2. Verifique o `DB_PASSWORD`
3. Tente conectar manualmente:
   ```bash
   mysql -u root -p
   ```
4. Se não souber a senha, você pode resetar:

**Windows:**
```bash
# Parar o MySQL
net stop MySQL80

# Reiniciar sem validação de senha
mysqld --skip-grant-tables

# Em outro terminal
mysql -u root

# Execute
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nova_senha';
EXIT;
```

### ❌ Erro: "Unknown database 'agroindustria_db'"

**Significado:** Banco de dados não foi criado

**Solução:**

```bash
# Criar o banco
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"

# Verificar
mysql -u root -p -e "SHOW DATABASES;"
```

### ❌ Erro: "Porta 3306 já está em uso"

**Significado:** Outro programa está usando a porta

**Solução:**

**Opção 1: Mude a porta do MySQL**

Edite o arquivo de configuração do MySQL:

**Windows:** `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`
```ini
[mysqld]
port=3307
```

**macOS/Linux:** `/usr/local/etc/my.cnf` ou `/etc/mysql/my.cnf`
```ini
[mysqld]
port=3307
```

Depois atualize o `.env`:
```env
DB_PORT=3307
```

**Opção 2: Mude a porta do Node.js**

Edite o `.env`:
```env
PORT=3001
```

### ❌ Erro: "Timeout waiting for connection"

**Significado:** Conexão levando muito tempo

**Solução:**

1. Verifique se MySQL está rodando
2. Verifique o host/porta em `.env`
3. Tente aumentar o timeout em `server.js`

### ❌ Erro: "PROTOCOL_CONNECTION_LOST"

**Significado:** Conexão perdida com MySQL

**Solução:**

1. Reinicie o MySQL
2. Verifique se há muitas conexões abertas
3. Aumente o `connectionLimit` em `server.js`

---

## Verificação Final

Antes de usar o sistema, execute:

```bash
# 1. Verificar Node.js
node --version
npm --version

# 2. Verificar MySQL
mysql --version

# 3. Testar conexão MySQL
mysql -u root -p -e "SELECT 1"

# 4. Verificar banco de dados
mysql -u root -p -e "SHOW DATABASES LIKE 'agroindustria_db'"

# 5. Instalar dependências
npm install

# 6. Iniciar servidor
npm start
```

Se tudo passar, acesse: **http://localhost:3000**

---

## Comandos Úteis MySQL

```bash
# Conectar ao MySQL
mysql -u root -p

# Listar bancos de dados
mysql -u root -p -e "SHOW DATABASES;"

# Listar tabelas de um banco
mysql -u root -p agroindustria_db -e "SHOW TABLES;"

# Ver estrutura de uma tabela
mysql -u root -p agroindustria_db -e "DESCRIBE raw_materials;"

# Fazer backup
mysqldump -u root -p agroindustria_db > backup.sql

# Restaurar backup
mysql -u root -p agroindustria_db < backup.sql

# Deletar banco (CUIDADO!)
mysql -u root -p -e "DROP DATABASE agroindustria_db;"
```

---

## Suporte

Se tiver dúvidas:

1. Verifique se MySQL está rodando
2. Teste a conexão manualmente
3. Verifique o arquivo `.env`
4. Abra o console do navegador (F12) para erros
5. Verifique os logs do servidor Node.js

---

**Pronto! Seu MySQL está configurado! 🎉**

Agora execute: `npm start`
