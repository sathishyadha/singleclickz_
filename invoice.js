// Invoice Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (orderId) {
        loadInvoice(orderId);
    } else {
        document.getElementById('invoiceContainer').innerHTML = '<p>Invoice not found</p>';
    }
});

function loadInvoice(orderId) {
    const invoice = generateInvoice(orderId);
    const container = document.getElementById('invoiceContainer');
    
    if (!invoice || !container) {
        container.innerHTML = '<p>Invoice not found</p>';
        return;
    }
    
    const order = getOrderById(orderId);
    
    let html = `
        <div class="invoice">
            <div class="invoice-header">
                <h1>Single Click Studio</h1>
                <p>Invoice</p>
            </div>
            <div class="invoice-details">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div class="invoice-info">
                        <h3>Bill To:</h3>
                        <p><strong>${order.customer.name}</strong></p>
                        <p>${order.customer.phone}</p>
                        <p>${order.customer.address}</p>
                    </div>
                    <div class="invoice-info" style="text-align: right;">
                        <p><strong>Order ID:</strong> ${invoice.orderId}</p>
                        <p><strong>Date:</strong> ${invoice.date}</p>
                    </div>
                </div>
            </div>
            <div class="invoice-items">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    invoice.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <tr>
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${itemTotal}</td>
            </tr>
        `;
    });
    
    html += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3"><strong>Total</strong></td>
                            <td><strong>₹${invoice.total}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="invoice-footer">
                <p>Thank you for your order!</p>
                <p>Contact: 8220193883</p>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

