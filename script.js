// script.js

// State
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editingId = null;

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const emptyState = document.getElementById('empty-state');
const totalAmountEl = document.getElementById('total-amount');
const totalCountEl = document.getElementById('total-count');
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');

// Edit Modal Elements
const editForm = document.getElementById('edit-form');
const editId = document.getElementById('edit-id');
const editDescrizione = document.getElementById('edit-descrizione');
const editImporto = document.getElementById('edit-importo');
const editCategoria = document.getElementById('edit-categoria');
const editData = document.getElementById('edit-data');
const editModalDiv = document.getElementById('editModal');
let editModal;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    editModal = new bootstrap.Modal(editModalDiv);
    renderExpenses();
});

// Utility to generate unique ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Event Listeners
expenseForm.addEventListener('submit', handleAddExpense);
editForm.addEventListener('submit', handleEditExpense);
searchInput.addEventListener('input', renderExpenses);
filterCategory.addEventListener('change', renderExpenses);

function handleAddExpense(e) {
    e.preventDefault();

    const descrizione = document.getElementById('descrizione').value.trim();
    const importo = parseFloat(document.getElementById('importo').value);
    const categoria = document.getElementById('categoria').value;
    const data = document.getElementById('data').value;

    if (!descrizione || isNaN(importo) || importo <= 0 || !categoria || !data) {
        alert("Per favore compila tutti i campi correttamente.");
        return;
    }

    const newExpense = {
        id: generateId(),
        descrizione,
        importo,
        categoria,
        data
    };

    expenses.push(newExpense);
    saveData();
    expenseForm.reset();
    renderExpenses();
}

function deleteExpense(id) {
    if (confirm("Sei sicuro di voler eliminare questa spesa?")) {
        expenses = expenses.filter(exp => exp.id !== id);
        saveData();
        renderExpenses();
    }
}

function openEditModal(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;

    editId.value = expense.id;
    editDescrizione.value = expense.descrizione;
    editImporto.value = expense.importo;
    editCategoria.value = expense.categoria;
    editData.value = expense.data;

    editModal.show();
}

function handleEditExpense(e) {
    e.preventDefault();

    const id = editId.value;
    const descrizione = editDescrizione.value.trim();
    const importo = parseFloat(editImporto.value);
    const categoria = editCategoria.value;
    const data = editData.value;

    if (!descrizione || isNaN(importo) || importo <= 0 || !categoria || !data) {
        alert("Per favore compila tutti i campi correttamente.");
        return;
    }

    const index = expenses.findIndex(exp => exp.id === id);
    if (index !== -1) {
        expenses[index] = { id, descrizione, importo, categoria, data };
        saveData();
        renderExpenses();
        editModal.hide();
    }
}

function getCategoryClassSuffix(category) {
    switch (category) {
        case 'Casa': return 'casa';
        case 'Cibo': return 'cibo';
        case 'Trasporti': return 'trasporti';
        case 'Tempo libero': return 'tempolibero';
        case 'Salute': return 'salute';
        default: return 'altro';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
}

function renderExpenses() {
    // Sorting by date descending
    let filtered = [...expenses].sort((a, b) => new Date(b.data) - new Date(a.data));

    // Search filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(exp => exp.descrizione.toLowerCase().includes(searchTerm));
    }

    // Category filter
    const filterCat = filterCategory.value;
    if (filterCat !== 'Tutte') {
        filtered = filtered.filter(exp => exp.categoria === filterCat);
    }

    // Clear list
    expenseList.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.classList.remove('d-none');
    } else {
        emptyState.classList.add('d-none');
        
        filtered.forEach(exp => {
            const catSuffix = getCategoryClassSuffix(exp.categoria);
            
            const card = document.createElement('div');
            card.className = `card expense-card cat-${catSuffix} border-0 shadow-sm`;
            card.innerHTML = `
                <div class="card-body p-3 d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-none d-sm-flex flex-column align-items-center justify-content-center bg-body-secondary rounded px-3 py-2 text-center" style="min-width: 70px;">
                            <span class="small fw-semibold text-uppercase text-muted">${new Date(exp.data).toLocaleDateString('it-IT', {month:'short'})}</span>
                            <span class="fs-5 fw-bold leading-none">${new Date(exp.data).getDate()}</span>
                        </div>
                        <div>
                            <h6 class="mb-1 fw-bold text-truncate" style="max-width: 200px;">${exp.descrizione}</h6>
                            <div class="d-flex align-items-center gap-2">
                                <span class="badge badge-${catSuffix} text-white">${exp.categoria}</span>
                                <span class="small text-muted d-sm-none"><i class="bi bi-calendar-event me-1"></i>${formatDate(exp.data)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 gap-sm-3">
                        <h5 class="mb-0 fw-bold">${formatCurrency(exp.importo)}</h5>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-secondary rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                                <li><a class="dropdown-item py-2" href="#" onclick="openEditModal('${exp.id}'); return false;"><i class="bi bi-pencil me-2 text-primary"></i>Modifica</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item py-2 text-danger" href="#" onclick="deleteExpense('${exp.id}'); return false;"><i class="bi bi-trash me-2"></i>Elimina</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            expenseList.appendChild(card);
        });
    }

    updateSummary();
}

function updateSummary() {
    const totale = Object.values(expenses).reduce((sum, exp) => sum + exp.importo, 0);
    totalAmountEl.textContent = formatCurrency(totale);
    totalCountEl.textContent = expenses.length;
}

function saveData() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
