async function fetchProducts() {
    const response = await fetch('http://localhost:8080/products');
    const products = await response.json();
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.name} - $${product.price}
            <button onclick="deleteProduct(${product.sku})">Delete</button>
        `;
        itemList.appendChild(listItem);
    });
}

async function fetchOrders() {
    const response = await fetch('http://localhost:8080/orders');
    const orders = await response.json();
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    orders.forEach(order => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Customer:</strong> ${order.name} <br>
            <strong>Status:</strong> ${order.status} <br>
            <button onclick="deleteOrder(${order.id})">Delete</button>
        `;
        orderList.appendChild(listItem);
    });
}

async function loadBrandsAndCategories() {
    try {
        const brandResponse = await fetch('http://localhost:8080/brands');
        const brands = await brandResponse.json();
        const brandSelect = document.getElementById('itemBrand');
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });

        const categoryResponse = await fetch('http://localhost:8080/categories');
        const categories = await categoryResponse.json();
        const categorySelect = document.getElementById('itemCategory');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        document.getElementById('submitButton').disabled = false;
    } catch (error) {
        console.error("Failed to load brands or categories:", error);
        alert("Cannot load brands/categories from server. Please refresh the page.");
    }
}

async function addProduct(name, price, brand, category) {
    console.log("Selected Brand:", brand);
    console.log("Selected Category:", category);

    if (!brand || !category) {
        alert("Please select both brand and category before adding a product.");
        return;
    }

    const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            sku: Math.floor(Math.random() * 1000000),
            name: name,
            short_description: '',
            long_description: '',
            images: [],
            price: price.toFixed(2).toString(),
            discount: "0.00",
            available_inventory: 10,
            category: [category],
            pbrand: brand
        })
    });

    if (response.ok) {
        await fetchProducts();
    } else {
        const errorText = await response.text();
        console.error('Failed to add product:', errorText);
        alert('Failed to add product: ' + errorText);
    }
}

async function deleteProduct(sku) {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }

    const response = await fetch(`http://localhost:8080/products/${sku}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        await fetchProducts();
    } else {
        const errorText = await response.text();
        console.error('Failed to delete product:', errorText);
        alert('Failed to delete product: ' + errorText);
    }
}

async function addOrder(name, phone, email, addressL1, city, province, country, courier, tracking) {
    const order = {
        id: Math.floor(Math.random() * 1000000),
        items: [
            {
                sku: 12345,
                name: "Test Product",
                price: 199.99,
                quantity: 1
            }
        ],
        name: name,
        company: "",
        phone: phone,
        email: email,
        address_l1: addressL1,
        address_l2: "",
        city: city,
        province: province,
        country: country,
        courier: courier,
        tracking: tracking,
        delivery_message: "Please leave at front door",
        status: "Pending"
    };

    const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    });

    if (response.ok) {
        await fetchOrders();
    } else {
        const errorText = await response.text();
        console.error('Failed to place order:', errorText);
        alert('Failed to place order: ' + errorText);
    }
}

async function deleteOrder(orderId) {
    if (!confirm("Are you sure you want to delete this order?")) {
        return;
    }

    const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        await fetchOrders();
    } else {
        const errorText = await response.text();
        console.error('Failed to delete order:', errorText);
        alert('Failed to delete order: ' + errorText);
    }
}

document.getElementById('itemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const brand = document.getElementById('itemBrand').value;
    const category = document.getElementById('itemCategory').value;

    if (!name || isNaN(price) || price <= 0 || !brand || !category) {
        alert('Please fill all fields correctly.');
        return;
    }
    addProduct(name, price, brand, category);

    document.getElementById('itemForm').reset();
});

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;
    const addressL1 = document.getElementById('addressL1').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const country = document.getElementById('country').value;
    const courier = document.getElementById('courier').value;
    const tracking = document.getElementById('tracking').value;

    if (!name || !phone || !email || !addressL1 || !city || !province || !country || !courier || !tracking) {
        alert('Please fill all fields.');
        return;
    }

    addOrder(name, phone, email, addressL1, city, province, country, courier, tracking);

    document.getElementById('orderForm').reset();
});

document.addEventListener("DOMContentLoaded", function() {
    loadBrandsAndCategories();
    fetchProducts();
    fetchOrders();

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
});
