const incomeSources = [];
const totalIncomeInput = document.getElementById('total-income');
const totalExpensesInput = document.getElementById('total-expenses');
const totalSavingsInput = document.getElementById('total-savings');
const cashBalanceEl = document.getElementById('cash-balance');
const incomeSourcesList = document.getElementById('income-sources');
const addIncomeSourceBtn = document.getElementById('add-income-source');
const ctx = document.getElementById('budget-chart').getContext('2d');

let chart;

function updateChart(income, expenses, savings) {
  const remaining = income - (expenses + savings);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Expenses', 'Savings', 'Remaining'],
      datasets: [{
        data: [expenses, savings, remaining],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
      }],
    },
  });
}

function updateBalance() {
  const totalIncome = parseFloat(totalIncomeInput.value) || 0;
  const totalExpenses = parseFloat(totalExpensesInput.value) || 0;
  const totalSavings = parseFloat(totalSavingsInput.value) || 0;

  const cashBalance = totalIncome - (totalExpenses + totalSavings);
  cashBalanceEl.textContent = `Balance: $${cashBalance.toFixed(2)}`;
  updateChart(totalIncome, totalExpenses, totalSavings);
}

addIncomeSourceBtn.addEventListener('click', () => {
  const incomeSource = prompt('Enter income source description:');
  const incomeAmount = parseFloat(prompt('Enter income amount:')) || 0;

  if (incomeSource && incomeAmount) {
    incomeSources.push({ source: incomeSource, amount: incomeAmount });
    const listItem = document.createElement('li');
    listItem.textContent = `${incomeSource}: $${incomeAmount}`;
    incomeSourcesList.appendChild(listItem);

    const totalIncome = incomeSources.reduce((sum, item) => sum + item.amount, 0);
    totalIncomeInput.value = totalIncome;
    updateBalance();
  }
});

[totalIncomeInput, totalExpensesInput, totalSavingsInput].forEach(input => {
  input.addEventListener('input', updateBalance);
});
