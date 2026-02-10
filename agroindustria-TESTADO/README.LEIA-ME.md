# 🎯 LEIA-ME PRIMEIRO

## ⚡ Início Rápido (3 Passos)

### 1️⃣ Configure a Senha do MySQL

Abra o arquivo `.env` e adicione sua senha:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=agroindustria_db
PORT=3000
```

**Exemplo com senha "mysql123":**
```env
DB_PASSWORD=mysql123
```

### 2️⃣ Crie o Banco de Dados

Abra o terminal e execute:

```bash
mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"
```

(Digite sua senha quando pedir)

### 3️⃣ Instale e Rode

```bash
npm install
npm start
```

Acesse: **http://localhost:3000**

---

## 📋 O Que Fazer Agora

1. ✅ Configure a senha no `.env`
2. ✅ Crie o banco de dados
3. ✅ Execute `npm install`
4. ✅ Execute `npm start`
5. ✅ Crie sua conta (Aba "Cadastro")
6. ✅ Faça login
7. ✅ Use o sistema!

---

## 📁 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `.env` | Configuração do MySQL (EDITE AQUI!) |
| `server.js` | Backend Node.js |
| `public/login.html` | Página de login |
| `public/index.html` | Dashboard principal |
| `public/app.js` | Lógica do frontend |
| `public/styles.css` | Estilos CSS |
| `TESTE_COMPLETO.md` | Guia de testes |
| `CONFIGURAR_SENHA.md` | Como configurar senha MySQL |
| `GUIA_COMPLETO.md` | Documentação completa |

---

## ❌ Erros Comuns

### Erro: "Access denied for user 'root'@'localhost'"
**Solução:** Configure a senha no `.env`

### Erro: "Unknown database"
**Solução:** Crie o banco: `mysql -u root -p -e "CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;"`

### Erro: "Port 3000 is already in use"
**Solução:** Mude a porta no `.env` para 3001, 3002, 8000, etc.

### Erro: "MySQL não está rodando"
**Solução:** Inicie o MySQL:
- Windows: `net start MySQL80`
- macOS: `brew services start mysql`
- Linux: `sudo systemctl start mysql`

---

## ✨ Funcionalidades

✅ **Autenticação Segura** - Cadastro e login com validações
✅ **Dashboard** - KPIs e gráficos em tempo real
✅ **Matérias-Primas** - CRUD completo
✅ **Fornecedores** - Gestão com histórico
✅ **Entrada de Estoque** - Com lotes e vencimento
✅ **Movimentações** - Histórico rastreável
✅ **Relatórios** - Com filtros e exportação CSV
✅ **Alertas** - Estoque baixo/crítico
✅ **Rastreabilidade** - Timeline completa

---

## 🧪 Testar o Sistema

Após fazer login, siga o guia em **TESTE_COMPLETO.md** para validar todas as funcionalidades.

---

## 📞 Precisa de Ajuda?

Consulte os arquivos:
- **CONFIGURAR_SENHA.md** - Problemas com MySQL
- **GUIA_COMPLETO.md** - Documentação detalhada
- **ALTERAR_PORTA.md** - Como mudar porta
- **TESTE_COMPLETO.md** - Como testar

---

## 🚀 Pronto!

Você tem tudo que precisa. Configure, instale e comece a usar!

**Sistema testado e validado! ✅**
