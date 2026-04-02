// ===== State =====
const state = {
  role: localStorage.getItem('role') || 'viewer',
  theme: localStorage.getItem('theme') || 'dark',
  currentPage: 'dashboard',
  transactions: JSON.parse(localStorage.getItem('transactions')) || getSeedData(),
  filters: { search: '', type: '', category: '', sort: 'date-desc' },
  editingId: null,
  trendChart: null,
  donutChart: null,
  barChart: null,
};

// ===== Seed Data =====
function getSeedData() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  const data = [
    // Current month
    { id: uid(), desc: 'Salary', amount: 85000, type: 'income', category: 'Salary', date: fmtDate(y, m, 1) },
    { id: uid(), desc: 'Freelance Project', amount: 22000, type: 'income', category: 'Freelance', date: fmtDate(y, m, 5) },
    { id: uid(), desc: 'Monthly Rent', amount: 18000, type: 'expense', category: 'Housing', date: fmtDate(y, m, 3) },
    { id: uid(), desc: 'Grocery Shopping', amount: 4200, type: 'expense', category: 'Food & Dining', date: fmtDate(y, m, 6) },
    { id: uid(), desc: 'Uber Rides', amount: 1800, type: 'expense', category: 'Transport', date: fmtDate(y, m, 8) },
    { id: uid(), desc: 'Swiggy Order', amount: 750, type: 'expense', category: 'Food & Dining', date: fmtDate(y, m, 9) },
    { id: uid(), desc: 'Netflix Subscription', amount: 649, type: 'expense', category: 'Entertainment', date: fmtDate(y, m, 10) },
    { id: uid(), desc: 'Electricity Bill', amount: 2400, type: 'expense', category: 'Utilities', date: fmtDate(y, m, 12) },
    { id: uid(), desc: 'Amazon Shopping', amount: 3800, type: 'expense', category: 'Shopping', date: fmtDate(y, m, 14) },
    { id: uid(), desc: 'Doctor Visit', amount: 1200, type: 'expense', category: 'Healthcare', date: fmtDate(y, m, 16) },
    { id: uid(), desc: 'Zomato Order', amount: 620, type: 'expense', category: 'Food & Dining', date: fmtDate(y, m, 18) },
    { id: uid(), desc: 'SIP Investment', amount: 10000, type: 'expense', category: 'Investment', date: fmtDate(y, m, 20) },

    // Last month
    { id: uid(), desc: 'Salary', amount: 85000, type: 'income', category: 'Salary', date: fmtDate(y, m-1, 1) },
    { id: uid(), desc: 'Monthly Rent', amount: 18000, type: 'expense', category: 'Housing', date: fmtDate(y, m-1, 3) },
    { id: uid(), desc: 'Grocery Shopping', amount: 5100, type: 'expense', category: 'Food & Dining', date: fmtDate(y, m-1, 7) },
    { id: uid(), desc: 'Metro Pass', amount: 600, type: 'expense', category: 'Transport', date: fmtDate(y, m-1, 10) },
    { id: uid(), desc: 'Myntra Sale', amount: 6200, type: 'expense', category: 'Shopping', date: fmtDate(y, m-1, 15) },
    { id: uid(), desc: 'Electricity Bill', amount: 1950, type: 'expense', category: 'Utilities', date: fmtDate(y, m-1, 18) },
    { id: uid(), desc: 'Movie Tickets', amount: 800, type: 'expense', category: 'Entertainment', date: fmtDate(y, m-1, 22) },
    { id: uid(), desc: 'Freelance Design', amount: 15000, type: 'income', category: 'Freelance', date: fmtDate(y, m-1, 25) },
    { id: uid(), desc: 'SIP Investment', amount: 10000, type: 'expense', category: 'Investment', date: fmtDate(y, m-1, 20) },

    // 2 months ago
    { id: uid(), desc: 'Salary', amount: 80000, type: 'income', category: 'Salary', date: fmtDate(y, m-2, 1) },
    { id: uid(), desc: 'Monthly Rent', amount: 18000, type: 'expense', category: 'Housing', date: fmtDate(y, m-2, 3) },
    { id: uid(), desc: 'Annual Checkup', amount: 3500, type: 'expense', category: 'Healthcare', date: fmtDate(y, m-2, 8) },
    { id: uid(), desc: 'Grocery Shopping', amount: 4800, type: 'expense', category: 'Food & Dining', date: fmtDate(y, m-2, 12) },
    { id: uid(), desc: 'Flight Tickets', amount: 9200, type: 'expense', category: 'Transport', date: fmtDate(y, m-2, 18) },
    { id: uid(), desc: 'SIP Investment', amount: 10000, type: 'expense', category: 'Investment', date: fmtDate(y, m-2, 20) },
    { id: uid(), desc: 'Electricity Bill', amount: 2100, type: 'expense', category: 'Utilities', date: fmtDate(y, m-2, 22) },
  ];
  return data;
}

function fmtDate(y, m, d) {
  const date = new Date(y, m, d);
  return date.toISOString().split('T')[0];
}

function uid() {
  return Math.random().toString(36).substr(2, 9);
}

// ===== Helpers =====
function fmt(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function fmtDateDisplay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(state.transactions));
}

function currentMonthTxns() {
  const now = new Date();
  return state.transactions.filter(t => {
    const d = new Date(t.date + 'T00:00:00');
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
}

function getCategoryIcon(category) {
  const icons = {
    'Food & Dining': '🍽️', 'Housing': '🏠', 'Transport': '🚗',
    'Entertainment': '🎬', 'Healthcare': '💊', 'Shopping': '🛍️',
    'Utilities': '⚡', 'Salary': '💼', 'Freelance': '💻',
    'Investment': '📈', 'Other': '◎',
  };
  return icons[category] || '◎';
}

const PALETTE = [
  '#e8a623','#60a5fa','#34d399','#f87171','#a78bfa',
  '#fb923c','#38bdf8','#4ade80','#f472b6','#facc15'
];

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  applyRole(state.role);
  setupNav();
  setupRoleSwitcher();
  setupThemeToggle();
  setupMobileMenu();
  setupModal();
  setupFilters();
  setupExport();

  document.getElementById('headerDate').textContent =
    new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  renderDashboard();
  renderTransactions();
  renderInsights();
});

// ===== Theme =====
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (state.trendChart || state.donutChart || state.barChart) {
    setTimeout(() => {
      renderCharts();
    }, 50);
  }
}

function setupThemeToggle() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(state.theme);
  });
}

// ===== Role =====
function applyRole(role) {
  state.role = role;
  localStorage.setItem('role', role);
  const adminEls = document.querySelectorAll('.admin-only');
  adminEls.forEach(el => el.classList.toggle('hidden', role !== 'admin'));
}

function setupRoleSwitcher() {
  ['roleSelect', 'roleSelectMobile'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = state.role;
    el.addEventListener('change', () => {
      state.role = el.value;
      document.getElementById('roleSelect').value = state.role;
      document.getElementById('roleSelectMobile').value = state.role;
      applyRole(state.role);
      renderTransactions();
    });
  });
}

// ===== Navigation =====
function setupNav() {
  document.querySelectorAll('.nav-item, .panel-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) navigateTo(page);
      closeMobileMenu();
    });
  });
}

function navigateTo(page) {
  state.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page)?.classList.add('active');
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
}

// ===== Mobile Menu =====
function setupMobileMenu() {
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';
  document.body.appendChild(overlay);

  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('active');
}

// ===== Dashboard =====
function renderDashboard() {
  const curr = currentMonthTxns();
  const income = curr.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = curr.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    - state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savings = income > 0 ? ((income - expenses) / income * 100) : 0;

  document.getElementById('totalBalance').textContent = fmt(balance);
  document.getElementById('totalIncome').textContent = fmt(income);
  document.getElementById('totalExpenses').textContent = fmt(expenses);
  document.getElementById('savingsRate').textContent = savings.toFixed(1) + '%';
  document.getElementById('balanceTrend').textContent = savings >= 0 ? '▲ Positive cash flow' : '▼ Spending exceeds income';
  setTimeout(() => {
    document.getElementById('savingsBar').style.width = Math.max(0, Math.min(100, savings)) + '%';
  }, 300);

  renderRecent();
  renderCharts();
}

function renderRecent() {
  const sorted = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  const list = document.getElementById('recentList');
  if (!sorted.length) { list.innerHTML = '<div class="empty-state"><div class="empty-icon">◎</div>No transactions yet</div>'; return; }
  list.innerHTML = sorted.map(t => txnHTML(t, false)).join('');
}

// ===== Charts =====
function getChartDefaults() {
  const isDark = state.theme === 'dark';
  return {
    gridColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    textColor: isDark ? '#6b7280' : '#888880',
    tooltipBg: isDark ? '#1a1e2a' : '#ffffff',
    tooltipText: isDark ? '#e8eaf0' : '#1a1a1a',
  };
}

function renderCharts() {
  renderTrendChart();
  renderDonutChart();
  renderBarChart();
}

function renderTrendChart() {
  const { gridColor, textColor, tooltipBg, tooltipText } = getChartDefaults();
  const ctx = document.getElementById('trendChart').getContext('2d');

  // Build last 6 months balance trend (running balance by month end)
  const months = [];
  const balances = [];
  const now = new Date();
  let runningBalance = 0;

  // Get all txns sorted
  const sorted = [...state.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    months.push(label);
  }

  // Calculate cumulative balance at end of each of the last 6 months
  let balanceByMonth = {};
  let cum = 0;
  sorted.forEach(t => {
    const d = new Date(t.date + 'T00:00:00');
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!balanceByMonth[key]) balanceByMonth[key] = 0;
    balanceByMonth[key] += t.type === 'income' ? t.amount : -t.amount;
  });

  let running = 0;
  // Compute running balance for all months before last 6 first
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    running += balanceByMonth[key] || 0;
    balances.push(running);
  }

  if (state.trendChart) state.trendChart.destroy();

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(232,166,35,0.3)');
  gradient.addColorStop(1, 'rgba(232,166,35,0.02)');

  state.trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Balance',
        data: balances,
        borderColor: '#e8a623',
        backgroundColor: gradient,
        borderWidth: 2,
        pointBackgroundColor: '#e8a623',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tooltipBg,
          titleColor: textColor,
          bodyColor: tooltipText,
          borderColor: 'rgba(232,166,35,0.3)',
          borderWidth: 1,
          callbacks: { label: ctx => ' ' + fmt(ctx.parsed.y) }
        }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'DM Mono', size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'DM Mono', size: 11 }, callback: v => '₹' + (v/1000).toFixed(0) + 'k' } }
      }
    }
  });
}

function renderDonutChart() {
  const { textColor, tooltipBg, tooltipText } = getChartDefaults();
  const ctx = document.getElementById('donutChart').getContext('2d');

  const curr = currentMonthTxns().filter(t => t.type === 'expense');
  const catMap = {};
  curr.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const cats = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 6);

  if (state.donutChart) state.donutChart.destroy();

  if (!cats.length) {
    const legendEl = document.getElementById('donutLegend');
    legendEl.innerHTML = '<span style="color:var(--text-muted);font-size:12px">No expense data</span>';
    return;
  }

  state.donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: cats.map(c => c[0]),
      datasets: [{
        data: cats.map(c => c[1]),
        backgroundColor: PALETTE.slice(0, cats.length),
        borderWidth: 0,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tooltipBg,
          bodyColor: tooltipText,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.label}: ${fmt(ctx.parsed)}` }
        }
      }
    }
  });

  const legendEl = document.getElementById('donutLegend');
  legendEl.innerHTML = cats.map((c, i) =>
    `<div class="donut-legend-item"><div class="donut-legend-dot" style="background:${PALETTE[i]}"></div>${c[0]}</div>`
  ).join('');
}

function renderBarChart() {
  const { gridColor, textColor, tooltipBg, tooltipText } = getChartDefaults();
  const ctx = document.getElementById('barChart').getContext('2d');

  const now = new Date();
  const months = [];
  const incomeData = [];
  const expenseData = [];

  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleDateString('en-IN', { month: 'short' }));
    const txns = state.transactions.filter(t => {
      const td = new Date(t.date + 'T00:00:00');
      return td.getFullYear() === d.getFullYear() && td.getMonth() === d.getMonth();
    });
    incomeData.push(txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0));
    expenseData.push(txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  }

  if (state.barChart) state.barChart.destroy();

  state.barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        { label: 'Income', data: incomeData, backgroundColor: 'rgba(52,211,153,0.7)', borderRadius: 6, borderSkipped: false },
        { label: 'Expenses', data: expenseData, backgroundColor: 'rgba(248,113,113,0.7)', borderRadius: 6, borderSkipped: false },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: textColor, font: { family: 'Outfit', size: 12 }, boxWidth: 12, boxHeight: 12 }
        },
        tooltip: {
          backgroundColor: tooltipBg,
          titleColor: textColor,
          bodyColor: tooltipText,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, callback: v => '₹' + (v/1000).toFixed(0) + 'k' } }
      }
    }
  });
}

// ===== Transactions =====
function txnHTML(t, showActions) {
  const isIncome = t.type === 'income';
  const actions = showActions && state.role === 'admin' ? `
    <div class="txn-actions">
      <button class="btn-icon" onclick="editTxn('${t.id}')" title="Edit">✏</button>
      <button class="btn-icon btn-icon--danger" onclick="deleteTxn('${t.id}')" title="Delete">✕</button>
    </div>` : '<div></div>';

  return `<div class="txn-item">
    <div class="txn-icon txn-icon--${t.type}">${getCategoryIcon(t.category)}</div>
    <div>
      <div class="txn-desc">${t.desc}</div>
      <div class="txn-meta">${t.category} · ${fmtDateDisplay(t.date)}</div>
    </div>
    <div class="txn-amount txn-amount--${t.type}">${isIncome ? '+' : '−'}${fmt(t.amount)}</div>
    ${actions}
  </div>`;
}

function getFilteredTxns() {
  const { search, type, category, sort } = state.filters;
  let txns = [...state.transactions];

  if (search) {
    const q = search.toLowerCase();
    txns = txns.filter(t => t.desc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }
  if (type) txns = txns.filter(t => t.type === type);
  if (category) txns = txns.filter(t => t.category === category);

  txns.sort((a, b) => {
    if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sort === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sort === 'amount-desc') return b.amount - a.amount;
    if (sort === 'amount-asc') return a.amount - b.amount;
  });

  return txns;
}

function renderTransactions() {
  const txns = getFilteredTxns();
  const list = document.getElementById('txnList');
  const empty = document.getElementById('txnEmpty');

  // Populate category filter
  const cats = [...new Set(state.transactions.map(t => t.category))].sort();
  const catFilter = document.getElementById('filterCategory');
  const currCat = catFilter.value;
  catFilter.innerHTML = '<option value="">All Categories</option>' + cats.map(c => `<option ${c === currCat ? 'selected' : ''}>${c}</option>`).join('');

  if (!txns.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    list.innerHTML = txns.map(t => txnHTML(t, true)).join('');
  }
}

function setupFilters() {
  document.getElementById('searchInput').addEventListener('input', e => {
    state.filters.search = e.target.value;
    renderTransactions();
  });
  document.getElementById('filterType').addEventListener('change', e => {
    state.filters.type = e.target.value;
    renderTransactions();
  });
  document.getElementById('filterCategory').addEventListener('change', e => {
    state.filters.category = e.target.value;
    renderTransactions();
  });
  document.getElementById('sortSelect').addEventListener('change', e => {
    state.filters.sort = e.target.value;
    renderTransactions();
  });
}

// ===== Insights =====
function renderInsights() {
  const curr = currentMonthTxns();
  const expenses = curr.filter(t => t.type === 'expense');
  const income = curr.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExp = expenses.reduce((s, t) => s + t.amount, 0);

  // Top category
  const catMap = {};
  expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const topCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];
  document.getElementById('topCategory').textContent = topCat ? topCat[0] : '—';
  document.getElementById('topCategoryAmt').textContent = topCat ? fmt(topCat[1]) + ' this month' : '';

  // Avg daily spend
  const daysInMonth = new Date().getDate();
  document.getElementById('avgDailySpend').textContent = totalExp > 0 ? fmt(totalExp / daysInMonth) : '₹0';

  // Largest expense
  const largest = expenses.sort((a, b) => b.amount - a.amount)[0];
  document.getElementById('largestExpense').textContent = largest ? fmt(largest.amount) : '—';
  document.getElementById('largestExpenseNote').textContent = largest ? largest.desc : '';

  // Ratio
  const ratio = totalExp > 0 ? (income / totalExp).toFixed(2) : '—';
  document.getElementById('incomeExpenseRatio').textContent = ratio + 'x';

  // Category breakdown
  const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const maxAmt = sortedCats[0]?.[1] || 1;
  document.getElementById('categoryBreakdown').innerHTML = sortedCats.map((c, i) =>
    `<div class="cat-item">
      <div class="cat-name">${getCategoryIcon(c[0])} ${c[0]}</div>
      <div class="cat-bar-wrap">
        <div class="cat-bar" style="background:${PALETTE[i % PALETTE.length]};width:0" data-w="${(c[1]/maxAmt*100).toFixed(1)}%"></div>
      </div>
      <div class="cat-amt">${fmt(c[1])}</div>
    </div>`
  ).join('');

  setTimeout(() => {
    document.querySelectorAll('.cat-bar[data-w]').forEach(bar => {
      bar.style.width = bar.dataset.w;
    });
  }, 100);
}

// ===== Modal =====
function setupModal() {
  document.getElementById('addTxnBtn').addEventListener('click', () => openModal());
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
  document.getElementById('modalSave').addEventListener('click', saveTxn);

  // Set default date to today
  document.getElementById('txnDate').value = new Date().toISOString().split('T')[0];
}

function openModal(id = null) {
  state.editingId = id;
  const modal = document.getElementById('modalOverlay');
  const title = document.getElementById('modalTitle');

  if (id) {
    const t = state.transactions.find(x => x.id === id);
    title.textContent = 'Edit Transaction';
    document.getElementById('txnDesc').value = t.desc;
    document.getElementById('txnAmount').value = t.amount;
    document.getElementById('txnType').value = t.type;
    document.getElementById('txnCategory').value = t.category;
    document.getElementById('txnDate').value = t.date;
  } else {
    title.textContent = 'Add Transaction';
    document.getElementById('txnDesc').value = '';
    document.getElementById('txnAmount').value = '';
    document.getElementById('txnType').value = 'expense';
    document.getElementById('txnCategory').value = 'Food & Dining';
    document.getElementById('txnDate').value = new Date().toISOString().split('T')[0];
  }

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  state.editingId = null;
}

function saveTxn() {
  const desc = document.getElementById('txnDesc').value.trim();
  const amount = parseFloat(document.getElementById('txnAmount').value);
  const type = document.getElementById('txnType').value;
  const category = document.getElementById('txnCategory').value;
  const date = document.getElementById('txnDate').value;

  if (!desc || !amount || amount <= 0 || !date) {
    alert('Please fill in all fields correctly.');
    return;
  }

  if (state.editingId) {
    const idx = state.transactions.findIndex(t => t.id === state.editingId);
    if (idx !== -1) {
      state.transactions[idx] = { ...state.transactions[idx], desc, amount, type, category, date };
    }
  } else {
    state.transactions.unshift({ id: uid(), desc, amount, type, category, date });
  }

  saveTransactions();
  closeModal();
  renderDashboard();
  renderTransactions();
  renderInsights();
}

function editTxn(id) {
  if (state.role !== 'admin') return;
  openModal(id);
}

function deleteTxn(id) {
  if (state.role !== 'admin') return;
  if (!confirm('Delete this transaction?')) return;
  state.transactions = state.transactions.filter(t => t.id !== id);
  saveTransactions();
  renderDashboard();
  renderTransactions();
  renderInsights();
}

// ===== Export =====
function setupExport() {
  document.getElementById('exportBtn').addEventListener('click', () => {
    const txns = getFilteredTxns();
    const rows = [['Date', 'Description', 'Category', 'Type', 'Amount (INR)']];
    txns.forEach(t => rows.push([t.date, t.desc, t.category, t.type, t.amount]));
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'transactions.csv';
    a.click();
  });
}
