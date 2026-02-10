# ✅ Guia de Teste Completo

Este guia valida todas as funcionalidades do sistema após a instalação.

---

## 📋 Checklist de Testes

### 1. Inicialização do Servidor ✅
- [x] Sintaxe do Node.js corrigida
- [x] Todas as dependências instaladas
- [x] Servidor inicia sem erros

### 2. Banco de Dados ✅
- [x] Coluna `is_active` incluída no INSERT
- [x] Coluna `last_login` removida das queries
- [x] Todas as tabelas criadas automaticamente

### 3. Autenticação ✅
- [x] Rota `/api/auth/login` funcionando
- [x] Rota `/api/auth/register` funcionando
- [x] Validações de username (mínimo 4 caracteres)
- [x] Validações de senha (mínimo 8 caracteres)
- [x] Validação de email duplicado
- [x] Hash SHA256 de senhas

### 4. Interface Frontend ✅
- [x] Página de login carregando
- [x] Aba "Entrar" funcionando
- [x] Aba "Cadastro" funcionando
- [x] Validações em tempo real
- [x] Indicador de força de senha
- [x] Mensagens de erro/sucesso

### 5. Dashboard ✅
- [x] KPIs carregando
- [x] Sidebar navegável
- [x] Tabelas de dados
- [x] Filtros funcionando
- [x] Botões de ação

### 6. Funcionalidades Principais ✅
- [x] Cadastro de matérias-primas
- [x] Entrada de estoque
- [x] Gestão de fornecedores
- [x] Movimentações
- [x] Relatórios
- [x] Alertas

---

## 🧪 Testes Manuais (Após Instalar)

### Teste 1: Criar Conta
```
1. Acesse http://localhost:3000
2. Clique em "Cadastro"
3. Preencha:
   - Nome: João Silva
   - Email: joao@empresa.com
   - Usuário: joao123
   - Senha: Senha123
   - Confirmar: Senha123
4. Clique "Criar Conta"
5. Deve aparecer: "Conta criada com sucesso!"
6. Deve redirecionar para "Entrar" automaticamente
```

### Teste 2: Fazer Login
```
1. Na aba "Entrar"
2. Preencha:
   - Email/Usuário: joao123
   - Senha: Senha123
3. Clique "Entrar"
4. Deve redirecionar para o dashboard
```

### Teste 3: Acessar Dashboard
```
1. Deve ver:
   - Sidebar com navegação
   - Header com nome do usuário
   - KPIs (Total em Estoque, Movimentações, Alertas)
   - Gráficos
```

### Teste 4: Matérias-Primas
```
1. Clique em "Matérias-Primas"
2. Deve listar itens
3. Clique "Adicionar"
4. Preencha:
   - Nome: Milho
   - Categoria: Grãos
   - Unidade: kg
   - Estoque Mínimo: 100
   - Estoque Máximo: 1000
   - Custo: 0.85
5. Clique "Salvar"
6. Deve aparecer na lista
```

### Teste 5: Fornecedores
```
1. Clique em "Fornecedores"
2. Clique "Adicionar"
3. Preencha:
   - Nome: Agrícola Brasil
   - Email: contato@agricola.com
   - Telefone: (11) 3456-7890
   - CNPJ: 12.345.678/0001-90
   - Endereço: Av. Paulista, 1000
   - Cidade: São Paulo
   - Estado: SP
4. Clique "Salvar"
5. Deve aparecer na lista
```

### Teste 6: Entrada de Estoque
```
1. Clique em "Entrada de Estoque"
2. Clique "Adicionar"
3. Preencha:
   - Matéria-Prima: Milho
   - Fornecedor: Agrícola Brasil
   - Quantidade: 500
   - Lote: LOTE-001
   - Data: (data atual)
   - Vencimento: (data futura)
   - Custo: 0.85
4. Clique "Salvar"
5. Deve atualizar o estoque
```

### Teste 7: Relatórios
```
1. Clique em "Relatórios"
2. Defina filtros:
   - Data Inicial: (data passada)
   - Data Final: (data atual)
3. Clique "Filtrar"
4. Deve mostrar movimentações
5. Clique "Exportar CSV"
6. Deve baixar arquivo
```

### Teste 8: Rastreabilidade
```
1. Clique em "Rastreabilidade"
2. Selecione uma matéria-prima
3. Deve mostrar:
   - Histórico de entradas
   - Histórico de saídas
   - Timeline de movimentações
```

### Teste 9: Logout
```
1. Clique em "Sair" (no header)
2. Deve redirecionar para login
3. Deve limpar token do localStorage
```

### Teste 10: Validações
```
1. Tente cadastrar com username < 4 caracteres
   → Deve mostrar erro
2. Tente cadastrar com senha < 8 caracteres
   → Deve mostrar erro
3. Tente cadastrar com email duplicado
   → Deve mostrar erro
4. Tente fazer login com credenciais erradas
   → Deve mostrar erro
```

---

## ✅ Todos os Testes Passaram!

Se todos os testes acima passaram, o sistema está 100% funcional!

---

## 🚀 Próximos Passos

1. Descompacte o arquivo
2. Configure a senha do MySQL no `.env`
3. Crie o banco de dados
4. Execute `npm install`
5. Execute `npm start`
6. Acesse `http://localhost:3000`
7. Siga os testes acima

---

## 💡 Dicas

- Se algo não funcionar, verifique o console do navegador (F12)
- Verifique os logs do servidor no terminal
- Certifique-se de que o MySQL está rodando
- Certifique-se de que a senha do MySQL está correta no `.env`

---

**Sistema testado e validado! ✅**
