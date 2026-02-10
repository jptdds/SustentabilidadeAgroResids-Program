# 🔐 Como Configurar a Senha do MySQL

## ❌ Erro Recebido:

```
Access denied for user 'root'@'localhost' (using password: NO)
```

Isso significa que o MySQL está pedindo uma senha, mas o arquivo `.env` está vazio.

---

## ✅ Solução:

### Opção 1: Se Você NÃO Tem Senha no MySQL

Se instalou o MySQL e não definiu uma senha (deixou em branco):

**1. Abra o arquivo `.env`:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agroindustria_db
PORT=3000
```

**2. Deixe como está (vazio)**

**3. Tente rodar novamente:**
```bash
npm start
```

Se ainda der erro, vá para a **Opção 2**.

---

### Opção 2: Se Você TEM Senha no MySQL

Se definiu uma senha durante a instalação:

**1. Abra o arquivo `.env`**

**2. Adicione sua senha:**
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

**3. Salve o arquivo**

**4. Tente rodar novamente:**
```bash
npm start
```

---

### Opção 3: Se Não Sabe Sua Senha

Se não lembra da senha do MySQL:

#### Windows:

**1. Abra o Prompt de Comando como Administrador**

**2. Reinicie o MySQL sem senha:**
```bash
net stop MySQL80
mysqld --skip-grant-tables
```

**3. Em outro Prompt de Comando:**
```bash
mysql -u root
```

**4. Execute:**
```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nova_senha';
EXIT;
```

**5. Edite o `.env`:**
```env
DB_PASSWORD=nova_senha
```

#### macOS:

```bash
brew services stop mysql
mysqld_safe --skip-grant-tables &
mysql -u root
```

Depois execute os mesmos comandos SQL acima.

#### Linux:

```bash
sudo systemctl stop mysql
sudo mysqld_safe --skip-grant-tables &
mysql -u root
```

Depois execute os mesmos comandos SQL acima.

---

### Opção 4: Criar Novo Usuário MySQL

Se preferir criar um novo usuário:

**1. Abra o MySQL com privilégios:**
```bash
mysql -u root -p
```
(Digite sua senha quando pedir)

**2. Execute:**
```sql
CREATE USER 'agroindustria'@'localhost' IDENTIFIED BY 'agroindustria123';
GRANT ALL PRIVILEGES ON agroindustria_db.* TO 'agroindustria'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

**3. Edite o `.env`:**
```env
DB_HOST=localhost
DB_USER=agroindustria
DB_PASSWORD=agroindustria123
DB_NAME=agroindustria_db
PORT=3000
```

**4. Tente rodar novamente:**
```bash
npm start
```

---

## 🔍 Verificar Conexão MySQL

Para testar se a conexão está funcionando:

**Windows/macOS/Linux:**
```bash
mysql -u root -p -h localhost
```

Se conectar com sucesso, a senha está correta.

---

## 📋 Checklist:

- [ ] Sabe sua senha do MySQL
- [ ] Editou o arquivo `.env` com a senha correta
- [ ] Criou o banco de dados: `CREATE DATABASE agroindustria_db CHARACTER SET utf8mb4;`
- [ ] Executou: `npm install`
- [ ] Executou: `npm run seed` (opcional)
- [ ] Executou: `npm start`
- [ ] Acessou: `http://localhost:3000`

---

## 💡 Dicas:

1. **Não use caracteres especiais** na senha (use apenas letras, números e underscore)
2. **Não deixe espaços** antes ou depois da senha
3. **Teste a conexão** antes de rodar o servidor
4. **Se ainda der erro**, verifique se o MySQL está rodando:
   - Windows: `net start MySQL80`
   - macOS: `brew services start mysql`
   - Linux: `sudo systemctl start mysql`

---

## 🆘 Ainda Não Funciona?

Se ainda receber o erro:

1. Verifique se o MySQL está rodando
2. Verifique se a senha está correta
3. Verifique se o arquivo `.env` foi salvo
4. Reinicie o terminal
5. Tente novamente

Se o problema persistir, entre em contato com o suporte.

---

**Pronto! Agora o sistema deve funcionar! 🚀**
