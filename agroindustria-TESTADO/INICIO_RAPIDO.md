# 🚀 Início Rápido - Sistema de Gestão de Estoque

## ⚡ 3 Passos para Rodar

### 1️⃣ Criar o Banco de Dados

Abra o terminal/PowerShell e execute:

```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"
```

Se pedir senha e você não tem, deixe em branco e pressione Enter.

### 2️⃣ Instalar Dependências

Na pasta do projeto:

```bash
npm install
```

### 3️⃣ Rodar o Sistema

```bash
npm start
```

Você verá:
```
✅ Servidor rodando em: http://localhost:3000
📊 Banco de dados: MySQL
🔌 Host: localhost
📦 Database: agroindustria_db
```

### 4️⃣ Abrir no Navegador

```
http://localhost:3000
```

---

## ✅ Arquivo .env Já Está Pronto!

O arquivo `.env` já vem configurado com:
- Host: `localhost`
- Usuário: `root`
- Senha: vazia (padrão)
- Banco: `agroindustria_db`
- Porta: `3000`

**Não precisa editar nada!**

---

## 🆘 Se Não Funcionar

### Erro: "connect ECONNREFUSED"
MySQL não está rodando. Inicie o serviço:

**Windows:**
```bash
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

### Erro: "Unknown database"
O banco não foi criado. Execute:

```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"
```

### Erro: "Access denied"
Sua senha do MySQL é diferente. Edite o arquivo `.env`:

```env
DB_PASSWORD=sua_senha_aqui
```

---

## 📋 Checklist

- [ ] MySQL instalado e rodando
- [ ] Banco de dados criado
- [ ] npm install executado
- [ ] npm start rodando
- [ ] Navegador em http://localhost:3000

---

**Pronto! 🎉 Sistema rodando!**
