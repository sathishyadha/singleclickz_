// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
    checkAdminSession();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            if (checkAdminPassword(password)) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                showAdminPanel();
            } else {
                alert('Incorrect password!');
            }
        });
    }
    
    // Set current month/year in report filters
    const now = new Date();
    const reportMonth = document.getElementById('reportMonth');
    const reportYear = document.getElementById('reportYear');
    if (reportMonth) reportMonth.value = now.getMonth();
    if (reportYear) reportYear.value = now.getFullYear();
});

function checkAdminSession() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showAdminPanel();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadDashboard();
    loadProducts();
    loadOrders();
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    showLoginModal();
    document.getElementById('loginForm').reset();
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionName + 'Section');
    if (section) {
        section.style.display = 'block';
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Dashboard Functions
function loadDashboard() {
    const orders = getOrders();
    const products = getProducts();
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalSales').textContent = '₹' + totalSales;
    document.getElementById('totalProducts').textContent = products.length;
}

// Product Management Functions
function loadProducts() {
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>
                <button class="btn btn-small" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteProductConfirm('${product.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function showProductForm(productId = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('productFormTitle');
    
    if (productId) {
        const product = getProductById(productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productDescription').value = product.description || '';
            document.getElementById('productImage').value = product.image || '🖼️';
            title.textContent = 'Edit Product';
        }
    } else {
        form.reset();
        document.getElementById('productId').value = '';
        title.textContent = 'Add Product';
    }
    
    modal.style.display = 'block';
}

function closeProductForm() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('productForm').reset();
}

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const product = {
        id: document.getElementById('productId').value || null,
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value || '🖼️'
    };
    
    saveProduct(product);
    loadProducts();
    closeProductForm();
    alert('Product saved successfully!');
});

function editProduct(productId) {
    showProductForm(productId);
}

function deleteProductConfirm(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(productId);
        loadProducts();
        alert('Product deleted successfully!');
    }
}

// Orders Functions
function loadOrders() {
    const orders = getOrders();
    const tbody = document.getElementById('ordersTableBody');
    
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No orders yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.reverse().map(order => {
        const date = new Date(order.date).toLocaleDateString('en-IN');
        const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        return `
            <tr>
                <td>${order.orderId}</td>
                <td>${date}</td>
                <td>${order.customer.name}<br>${order.customer.phone}</td>
                <td>${itemCount} item(s)</td>
                <td>₹${order.total}</td>
                <td>${order.status}</td>
            </tr>
        `;
    }).join('');
}

// Reports Functions
function generateReport() {
    const month = parseInt(document.getElementById('reportMonth').value);
    const year = parseInt(document.getElementById('reportYear').value);
    const report = calculateSales(month, year);
    const resultsDiv = document.getElementById('reportResults');
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    let html = `
        <div class="report-card">
            <h3>Sales Report for ${monthNames[month]} ${year}</h3>
            <div class="report-stats">
                <div class="report-stat">
                    <strong>Total Sales:</strong> ₹${report.totalSales}
                </div>
                <div class="report-stat">
                    <strong>Number of Orders:</strong> ${report.orderCount}
                </div>
            </div>
    `;
    
    if (report.topProducts.length > 0) {
        html += `
            <h4>Top Selling Products</h4>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity Sold</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        report.topProducts.forEach(product => {
            html += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
    } else {
        html += '<p>No sales data for this month.</p>';
    }
    
    html += '</div>';
    resultsDiv.innerHTML = html;
}

