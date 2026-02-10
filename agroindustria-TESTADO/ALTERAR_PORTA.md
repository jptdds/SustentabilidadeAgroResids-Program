# 🔧 Como Alterar o Localhost e Porta

## 📌 Problema
Você quer usar uma porta diferente de `3000` porque seu amigo já está usando `localhost:3000`.

## ✅ Solução

### Opção 1: Alterar Apenas a Porta do Servidor (RECOMENDADO)

**Passo 1: Abra o arquivo `.env`**

Procure por:
```env
PORT=3000
```

**Passo 2: Mude para outra porta**

Escolha uma porta entre 1024 e 65535. Exemplos:
```env
PORT=3001
PORT=3002
PORT=8080
PORT=8000
```

**Passo 3: Reinicie o servidor**

```bash
npm start
```

Agora acesse: `http://localhost:3001` (ou a porta que escolheu)

### Exemplo Prático

**Antes:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agroindustria_db
PORT=3000
```

**Depois:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agroindustria_db
PORT=3001
```

Reinicie e acesse: `http://localhost:3001`

---

## 🌐 Opção 2: Usar IP da Máquina em Vez de Localhost

Se você quer que outras pessoas na rede acessem o sistema:

**Passo 1: Descubra seu IP**

**Windows (PowerShell):**
```bash
ipconfig
```
Procure por "IPv4 Address" (ex: 192.168.1.100)

**macOS/Linux:**
```bash
ifconfig
```
ou
```bash
hostname -I
```

**Passo 2: Acesse usando o IP**

Em vez de `http://localhost:3000`, use:
```
http://192.168.1.100:3000
```

**Passo 3: Outras pessoas podem acessar**

Seu amigo pode acessar usando:
```
http://seu-ip:3000
```

---

## 🔄 Opção 3: Usar Diferentes Portas para Diferentes Máquinas

Se você e seu amigo estão em máquinas diferentes:

**Você:**
- Porta: 3000
- Acesso: `http://localhost:3000`

**Seu Amigo:**
- Porta: 3001
- Acesso: `http://localhost:3001`

Ambos podem rodar o servidor na mesma máquina com portas diferentes.

---

## 📋 Portas Comuns Disponíveis

| Porta | Uso |
|-------|-----|
| 3000 | Padrão (pode estar em uso) |
| 3001 | Alternativa comum |
| 3002 | Alternativa comum |
| 8000 | Uso geral |
| 8080 | Uso geral |
| 8888 | Uso geral |
| 5000 | Flask/Python |
| 9000 | Uso geral |

---

## ✅ Verificar se uma Porta Está em Uso

### Windows (PowerShell):
```bash
netstat -ano | findstr :3000
```

Se retornar algo, a porta está em uso.

### macOS/Linux:
```bash
lsof -i :3000
```

Se retornar algo, a porta está em uso.

---

## 🚀 Exemplo Completo

### Cenário: Seu amigo usa 3000, você quer usar 3001

**1. Edite o arquivo `.env`:**
```env
PORT=3001
```

**2. Reinicie o servidor:**
```bash
npm start
```

**3. Acesse:**
```
http://localhost:3001
```

**4. Login:**
- Username: `admin`
- Senha: `admin123`

**Pronto! 🎉**

---

## 🔗 Acessar de Outro Computador

Se você quer que outras pessoas acessem o sistema:

**1. Descubra seu IP:**
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
```

**2. Compartilhe o IP:**
```
http://192.168.1.100:3001
```

**3. Outras pessoas acessam:**
- Abrem o navegador
- Digitam: `http://192.168.1.100:3001`
- Fazem login

---

## ⚠️ Troubleshooting

### Erro: "Port 3000 is already in use"

**Solução:** Mude a porta no `.env`:
```env
PORT=3001
```

### Erro: "Cannot GET /"

**Solução:** Verifique se está acessando a porta correta:
```
http://localhost:3001  ✅ Correto
http://localhost:3000  ❌ Errado (se mudou para 3001)
```

### Erro: "Connection refused"

**Solução:** Verifique se o servidor está rodando:
```bash
npm start
```

---

## 📝 Resumo Rápido

| O que fazer | Comando |
|---|---|
| Mudar porta | Edite `.env` e mude `PORT=3001` |
| Reiniciar | `npm start` |
| Acessar | `http://localhost:3001` |
| Verificar IP | `ipconfig` (Windows) ou `ifconfig` (Mac/Linux) |
| Compartilhar | `http://seu-ip:3001` |

---

**Dúvidas? Veja o arquivo `README.md` para mais informações! 📚**
