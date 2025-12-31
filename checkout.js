// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            showPaymentSection();
        });
    }
    
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', () => {
            completeOrder();
        });
    }
});

function loadOrderSummary() {
    const cart = getCart();
    const summaryContainer = document.getElementById('orderSummaryItems');
    const totalElement = document.getElementById('orderTotal');
    
    if (!summaryContainer) return;
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="summary-item">
                <span>${item.productName} x ${item.quantity}</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    });
    
    summaryContainer.innerHTML = html;
    if (totalElement) {
        totalElement.textContent = total;
    }
}

function showPaymentSection() {
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentSection = document.getElementById('paymentSection');
    const paymentAmount = document.getElementById('paymentAmount');
    
    if (paymentSection && paymentAmount) {
        const total = getCartTotal();
        paymentAmount.textContent = total;
        
        // Generate QR Code
        const upiUrl = generateUPIQR(total);
        const qrContainer = document.getElementById('qrcode');
        
        if (qrContainer) {
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: upiUrl,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        
        checkoutForm.style.display = 'none';
        paymentSection.style.display = 'block';
        
        // Scroll to payment section
        paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function completeOrder() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    
    if (!customerName || !customerPhone || !customerAddress) {
        alert('Please fill in all customer details');
        return;
    }
    
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const customerData = {
        name: customerName,
        phone: customerPhone,
        address: customerAddress
    };
    
    const order = createOrder(customerData, cart);
    
    // Redirect to invoice page
    window.location.href = `invoice.html?orderId=${order.orderId}`;
}

