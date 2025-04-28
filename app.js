function addItem(name, price) {
    const itemList = document.getElementById('itemList');
    const listItem = document.createElement('li');
    listItem.textContent = ${name} - $${price};
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => {
      itemList.removeChild(listItem);
    };
    listItem.appendChild(deleteBtn);
    itemList.appendChild(listItem);
  }
  
  document.getElementById('itemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    addItem(name, price);
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
  });
  
  function addOrder(customerName, items, quantity, status) {
    const orderList = document.getElementById('orderList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Customer:</strong> ${customerName} <br>
      <strong>Items:</strong> ${items} x ${quantity} <br>
      <strong>Status:</strong> <span class="order-status ${status}">${status}</span>
    `;
    const deleteBtn = document.createElement('X');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => {
      orderList.removeChild(listItem);
    };
    listItem.appendChild(deleteBtn);
    orderList.appendChild(listItem);
  }
  
  
  document.addEventListener("DOMContentLoaded", function() {
    addOrder('John Doe', 'Laptop', 1, 'pending');
    addOrder('Jane Smith', 'Smartphone', 2, 'shipped');
    addOrder('Michael Johnson', 'Headphones', 1, 'delivered');
  });
  
  
  const ctx = document.getElementById('salesChart').getContext('2d');
  const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [{
        label: 'Sales',
        data: [100, 650, 200, 250],
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
