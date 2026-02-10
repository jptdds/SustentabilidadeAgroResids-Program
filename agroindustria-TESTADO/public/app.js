// ===== API BASE URL =====
const API_URL = 'http://localhost:3000/api';

// ===== AUTENTICAÇÃO =====

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    }
}

function checkAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

function updateUserInfo() {
    const user = getUser();
    if (user) {
        document.getElementById('userInfo').textContent = '👤 ' + user.username + ' (' + user.role + ')';
    }
}

// ===== FUNÇÕES GERAIS =====


// ===== FUNÇÕES GERAIS =====

// Mostrar página
function showPage(pageName) {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Remover classe active de todos os nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Mostrar página selecionada
    document.getElementById(pageName).classList.add('active');

    // Adicionar classe active ao nav item
    event.target.closest('.nav-item').classList.add('active');

    // Atualizar título
    const titles = {
        dashboard: 'Dashboard',
        materials: 'Matérias-Primas',
        entry: 'Entrada de Estoque',
        suppliers: 'Fornecedores',
        movements: 'Movimentações',
        reports: 'Relatórios',
        alerts: 'Alertas'
    };
    document.getElementById('pageTitle').textContent = titles[pageName];

    // Carregar dados da página
    if (pageName === 'dashboard') loadDashboard();
    if (pageName === 'materials') loadMaterials();
    if (pageName === 'entry') loadEntries();
    if (pageName === 'suppliers') loadSuppliers();
    if (pageName === 'movements') loadMovements();
    if (pageName === 'reports') loadReports();
    if (pageName === 'alerts') loadAlerts();
}

// Fetch com tratamento de erro
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na API:', error);
        alert('❌ Erro ao conectar com o servidor. Verifique se está rodando.');
        return null;
    }
}

// ===== VALIDAÇÕES =====

function validarNome(nome) {
    if (!nome || nome.trim() === '') return 'Nome é obrigatório';
    if (!/^[a-záéíóúãõçñ\s]+$/i.test(nome)) return 'Nome deve conter apenas letras';
    if (nome.length < 3) return 'Nome deve ter no mínimo 3 caracteres';
    return null;
}

function validarQuantidade(quantidade) {
    const num = parseFloat(quantidade);
    if (isNaN(num)) return 'Quantidade deve ser um número';
    if (num <= 0) return 'Quantidade deve ser maior que 0';
    return null;
}

function validarEmail(email) {
    if (!email) return null; // Email é opcional
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return 'Email inválido';
    return null;
}

// ===== DASHBOARD =====

async function loadDashboard() {
    try {
        // Carregar dados
        const materials = await fetchAPI('/raw-materials');
        const entries = await fetchAPI('/stock-entries');
        const suppliers = await fetchAPI('/suppliers');
        const alerts = await fetchAPI('/stock-alerts');

        // Atualizar KPIs
        document.getElementById('totalMaterials').textContent = materials?.length || 0;
        document.getElementById('totalSuppliers').textContent = suppliers?.length || 0;
        document.getElementById('criticalAlerts').textContent = alerts?.length || 0;

        // Calcular estoque total
        const totalStock = materials?.reduce((sum, m) => sum + (parseFloat(m.current_stock) || 0), 0) || 0;
        document.getElementById('totalStock').textContent = totalStock.toFixed(2);

        // Últimas entradas
        const latestEntries = entries?.slice(0, 5) || [];
        const tbody = document.querySelector('#latestEntries tbody');
        tbody.innerHTML = latestEntries.map(entry => `
            <tr>
                <td>${entry.material_name || 'N/A'}</td>
                <td>${parseFloat(entry.quantity).toFixed(2)} ${entry.unit}</td>
                <td>${entry.supplier_name || 'N/A'}</td>
                <td>${new Date(entry.entry_date).toLocaleDateString('pt-BR')}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// ===== MATÉRIAS-PRIMAS =====

async function loadMaterials() {
    const materials = await fetchAPI('/raw-materials');
    const tbody = document.querySelector('#materialsTable tbody');

    tbody.innerHTML = (materials || []).map(material => `
        <tr>
            <td>${material.name}</td>
            <td>${material.category}</td>
            <td>${parseFloat(material.current_stock).toFixed(2)} ${material.unit}</td>
            <td>${parseFloat(material.minimum_stock).toFixed(2)}</td>
            <td>${parseFloat(material.maximum_stock).toFixed(2)}</td>
            <td>
                <button class="btn-danger" onclick="deleteMaterial(${material.id})">Deletar</button>
            </td>
        </tr>
    `).join('');
}

function openMaterialForm() {
    document.getElementById('materialModal').classList.add('show');
}

function closeMaterialForm() {
    document.getElementById('materialModal').classList.remove('show');
    document.querySelector('#materialModal form').reset();
}

async function saveMaterial(event) {
    event.preventDefault();

    const name = document.getElementById('materialName').value.trim();
    const category = document.getElementById('materialCategory').value.trim();
    const unit = document.getElementById('materialUnit').value.trim();
    const minStock = parseFloat(document.getElementById('materialMinStock').value);
    const maxStock = parseFloat(document.getElementById('materialMaxStock').value);
    const unitCost = parseFloat(document.getElementById('materialUnitCost').value) || 0;

    // Validações
    let erro = validarNome(name);
    if (erro) {
        alert('❌ ' + erro);
        return;
    }

    if (!category) {
        alert('❌ Categoria é obrigatória');
        return;
    }

    if (!unit) {
        alert('❌ Unidade é obrigatória');
        return;
    }

    erro = validarQuantidade(minStock);
    if (erro) {
        alert('❌ Estoque Mínimo: ' + erro);
        return;
    }

    erro = validarQuantidade(maxStock);
    if (erro) {
        alert('❌ Estoque Máximo: ' + erro);
        return;
    }

    if (minStock > maxStock) {
        alert('❌ Estoque mínimo não pode ser maior que o máximo');
        return;
    }

    const material = {
        name,
        category,
        unit,
        minimum_stock: minStock,
        maximum_stock: maxStock,
        unit_cost: unitCost
    };

    const result = await fetchAPI('/raw-materials', {
        method: 'POST',
        body: JSON.stringify(material)
    });

    if (result) {
        alert('✅ Matéria-prima salva com sucesso!');
        closeMaterialForm();
        loadMaterials();
    }
}

async function deleteMaterial(id) {
    if (confirm('⚠️ Tem certeza que deseja deletar esta matéria-prima?')) {
        const result = await fetchAPI(`/raw-materials/${id}`, { method: 'DELETE' });
        if (result) {
            alert('✅ Matéria-prima deletada com sucesso!');
            loadMaterials();
        }
    }
}

// ===== ENTRADA DE ESTOQUE =====

async function loadEntries() {
    const entries = await fetchAPI('/stock-entries');
    const tbody = document.querySelector('#entriesTable tbody');

    tbody.innerHTML = (entries || []).map(entry => `
        <tr>
            <td>${entry.material_name || 'N/A'}</td>
            <td>${parseFloat(entry.quantity).toFixed(2)}</td>
            <td>${entry.lot_number}</td>
            <td>${entry.supplier_name || 'N/A'}</td>
            <td>${new Date(entry.entry_date).toLocaleDateString('pt-BR')}</td>
            <td>${entry.expiry_date ? new Date(entry.expiry_date).toLocaleDateString('pt-BR') : 'N/A'}</td>
        </tr>
    `).join('');

    // Carregar materiais e fornecedores nos selects
    const materials = await fetchAPI('/raw-materials');
    const suppliers = await fetchAPI('/suppliers');

    const materialSelect = document.getElementById('entryMaterial');
    materialSelect.innerHTML = '<option value="">Selecione a Matéria-Prima</option>' +
        (materials || []).map(m => `<option value="${m.id}">${m.name}</option>`).join('');

    const supplierSelect = document.getElementById('entrySupplier');
    supplierSelect.innerHTML = '<option value="">Selecione o Fornecedor</option>' +
        (suppliers || []).map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

function openEntryForm() {
    document.getElementById('entryModal').classList.add('show');
}

function closeEntryForm() {
    document.getElementById('entryModal').classList.remove('show');
    document.querySelector('#entryModal form').reset();
}

async function saveEntry(event) {
    event.preventDefault();

    const materialId = parseInt(document.getElementById('entryMaterial').value);
    const supplierId = parseInt(document.getElementById('entrySupplier').value);
    const quantity = parseFloat(document.getElementById('entryQuantity').value);
    const lot = document.getElementById('entryLot').value.trim();
    const entryDate = document.getElementById('entryDate').value;
    const expiryDate = document.getElementById('entryExpiry').value || null;
    const unitCost = parseFloat(document.getElementById('entryUnitCost').value) || 0;
    const notes = document.getElementById('entryNotes').value.trim();

    // Validações
    if (!materialId) {
        alert('❌ Selecione uma matéria-prima');
        return;
    }

    if (!supplierId) {
        alert('❌ Selecione um fornecedor');
        return;
    }

    let erro = validarQuantidade(quantity);
    if (erro) {
        alert('❌ Quantidade: ' + erro);
        return;
    }

    if (!lot) {
        alert('❌ Número do lote é obrigatório');
        return;
    }

    if (!entryDate) {
        alert('❌ Data de entrada é obrigatória');
        return;
    }

    const entry = {
        raw_material_id: materialId,
        supplier_id: supplierId,
        quantity: quantity,
        unit: 'kg',
        lot_number: lot,
        entry_date: entryDate,
        expiry_date: expiryDate,
        unit_cost: unitCost,
        notes: notes
    };

    const result = await fetchAPI('/stock-entries', {
        method: 'POST',
        body: JSON.stringify(entry)
    });

    if (result) {
        alert('✅ Entrada registrada com sucesso!');
        closeEntryForm();
        loadEntries();
        loadDashboard();
    }
}

// ===== FORNECEDORES =====

async function loadSuppliers() {
    const suppliers = await fetchAPI('/suppliers');
    const tbody = document.querySelector('#suppliersTable tbody');

    tbody.innerHTML = (suppliers || []).map(supplier => `
        <tr>
            <td>${supplier.name}</td>
            <td>${supplier.email || 'N/A'}</td>
            <td>${supplier.phone || 'N/A'}</td>
            <td>${supplier.cnpj || 'N/A'}</td>
            <td>
                <button class="btn-danger" onclick="deleteSupplier(${supplier.id})">Deletar</button>
            </td>
        </tr>
    `).join('');
}

function openSupplierForm() {
    document.getElementById('supplierModal').classList.add('show');
}

function closeSupplierForm() {
    document.getElementById('supplierModal').classList.remove('show');
    document.querySelector('#supplierModal form').reset();
}

async function saveSupplier(event) {
    event.preventDefault();

    const name = document.getElementById('supplierName').value.trim();
    const email = document.getElementById('supplierEmail').value.trim();
    const phone = document.getElementById('supplierPhone').value.trim();
    const cnpj = document.getElementById('supplierCNPJ').value.trim();
    const address = document.getElementById('supplierAddress').value.trim();
    const city = document.getElementById('supplierCity').value.trim();
    const state = document.getElementById('supplierState').value.trim();

    // Validações
    let erro = validarNome(name);
    if (erro) {
        alert('❌ Nome: ' + erro);
        return;
    }

    erro = validarEmail(email);
    if (erro) {
        alert('❌ ' + erro);
        return;
    }

    if (!phone) {
        alert('❌ Telefone é obrigatório');
        return;
    }

    if (!cnpj) {
        alert('❌ CNPJ é obrigatório');
        return;
    }

    const supplier = {
        name,
        email,
        phone,
        cnpj,
        address,
        city,
        state
    };

    const result = await fetchAPI('/suppliers', {
        method: 'POST',
        body: JSON.stringify(supplier)
    });

    if (result) {
        alert('✅ Fornecedor salvo com sucesso!');
        closeSupplierForm();
        loadSuppliers();
    }
}

async function deleteSupplier(id) {
    if (confirm('⚠️ Tem certeza que deseja deletar este fornecedor?')) {
        const result = await fetchAPI(`/suppliers/${id}`, { method: 'DELETE' });
        if (result) {
            alert('✅ Fornecedor deletado com sucesso!');
            loadSuppliers();
        }
    }
}

// ===== MOVIMENTAÇÕES =====

async function loadMovements() {
    const movements = await fetchAPI('/stock-movements');
    const tbody = document.querySelector('#movementsTable tbody');

    tbody.innerHTML = (movements || []).map(movement => `
        <tr>
            <td>${movement.material_name || 'N/A'}</td>
            <td>${movement.type === 'entrada' ? '📥 Entrada' : movement.type === 'saida' ? '📤 Saída' : '🔄 Transformação'}</td>
            <td>${parseFloat(movement.quantity).toFixed(2)} ${movement.unit}</td>
            <td>${movement.reason || 'N/A'}</td>
            <td>${new Date(movement.created_at).toLocaleDateString('pt-BR')}</td>
        </tr>
    `).join('');
}

// ===== RELATÓRIOS =====

async function loadReports() {
    const materials = await fetchAPI('/raw-materials');
    const materialSelect = document.getElementById('reportMaterial');

    materialSelect.innerHTML = '<option value="">Todas as Matérias-Primas</option>' +
        (materials || []).map(m => `<option value="${m.id}">${m.name}</option>`).join('');

    generateReport();
}

async function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const materialId = document.getElementById('reportMaterial').value;

    let url = '/reports/movements?';
    if (startDate) url += `startDate=${startDate}&`;
    if (endDate) url += `endDate=${endDate}&`;
    if (materialId) url += `materialId=${materialId}&`;

    const movements = await fetchAPI(url);
    const tbody = document.querySelector('#reportTable tbody');

    tbody.innerHTML = (movements || []).map(movement => `
        <tr>
            <td>${movement.material_name || 'N/A'}</td>
            <td>${movement.type}</td>
            <td>${parseFloat(movement.quantity).toFixed(2)}</td>
            <td>${new Date(movement.created_at).toLocaleDateString('pt-BR')}</td>
        </tr>
    `).join('');
}

function exportCSV() {
    const table = document.getElementById('reportTable');
    let csv = [];

    // Headers
    const headers = [];
    table.querySelectorAll('th').forEach(th => {
        headers.push(th.textContent);
    });
    csv.push(headers.join(','));

    // Rows
    table.querySelectorAll('tbody tr').forEach(tr => {
        const row = [];
        tr.querySelectorAll('td').forEach(td => {
            row.push('"' + td.textContent + '"');
        });
        csv.push(row.join(','));
    });

    // Download
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== ALERTAS =====

async function loadAlerts() {
    const alerts = await fetchAPI('/stock-alerts');
    const tbody = document.querySelector('#alertsTable tbody');

    tbody.innerHTML = (alerts || []).map(alert => `
        <tr>
            <td>${alert.material_name || 'N/A'}</td>
            <td>${alert.alert_type === 'low_stock' ? '⚠️ Estoque Baixo' : '🚨 Crítico'}</td>
            <td>${alert.message}</td>
            <td>${parseFloat(alert.current_stock).toFixed(2)}</td>
            <td>${new Date(alert.created_at).toLocaleDateString('pt-BR')}</td>
        </tr>
    `).join('');
}

async function checkAlerts() {
    const result = await fetchAPI('/check-alerts', { method: 'POST' });
    if (result) {
        alert(`✅ Verificação concluída! ${result.checked} alertas gerados.`);
        loadAlerts();
    }
}

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', () => {
    // Fechar modals ao clicar fora
    window.onclick = (event) => {
        const materialModal = document.getElementById('materialModal');
        const entryModal = document.getElementById('entryModal');
        const supplierModal = document.getElementById('supplierModal');

        if (event.target === materialModal) {
            closeMaterialForm();
        }
        if (event.target === entryModal) {
            closeEntryForm();
        }
        if (event.target === supplierModal) {
            closeSupplierForm();
        }
    };

    // Carregar dashboard na inicialização
    loadDashboard();
});

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticação
    if (!checkAuth()) {
        return;
    }

    // Atualizar informações do usuário
    updateUserInfo();

    // Fechar modals ao clicar fora
    window.onclick = (event) => {
        const materialModal = document.getElementById('materialModal');
        const entryModal = document.getElementById('entryModal');
        const supplierModal = document.getElementById('supplierModal');

        if (event.target === materialModal) {
            closeMaterialForm();
        }
        if (event.target === entryModal) {
            closeEntryForm();
        }
        if (event.target === supplierModal) {
            closeSupplierForm();
        }
    };

    // Carregar dashboard na inicialização
    loadDashboard();
});
