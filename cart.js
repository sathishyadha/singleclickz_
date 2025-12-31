// Cart Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // Clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
                loadCart();
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            const cart = getCart();
            if (cart.length === 0) {
                e.preventDefault();
                alert('Your cart is empty!');
            }
        });
    }
});

function loadCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cartContainer');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart to get started!</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        return;
    }
    
    let html = '<div class="cart-items">';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">${item.customization?.photo ? `<img src="${item.customization.photo}" alt="${item.productName}">` : '🖼️'}</div>
                <div class="cart-item-details">
                    <h3>${item.productName}</h3>
                    ${item.customization && Object.keys(item.customization).length > 0 ? `
                        <div class="cart-item-customization">
                            ${item.customization.size ? `<p><strong>Size:</strong> ${item.customization.size}</p>` : ''}
                            ${item.customization.color ? `<p><strong>Color:</strong> ${item.customization.color}</p>` : ''}
                            ${item.customization.name ? `<p><strong>Name:</strong> ${item.customization.name}</p>` : ''}
                            ${item.customization.date ? `<p><strong>Date:</strong> ${item.customization.date}</p>` : ''}
                            ${item.customization.message ? `<p><strong>Message:</strong> ${item.customization.message}</p>` : ''}
                        </div>
                    ` : ''}
                    <p class="cart-item-price">₹${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    <p>₹${itemTotal}</p>
                </div>
                <div class="cart-item-remove">
                    <button class="remove-btn" onclick="removeItem('${item.id}')">×</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    html += `
        <div class="cart-summary">
            <div class="cart-total">
                <h2>Total: ₹${total}</h2>
            </div>
        </div>
    `;
    
    cartContainer.innerHTML = html;
}

function updateQuantity(itemId, quantity) {
    updateCartQuantity(itemId, quantity);
    loadCart();
    updateCartIcon();
}

function removeItem(itemId) {
    if (confirm('Remove this item from cart?')) {
        removeFromCart(itemId);
        loadCart();
        updateCartIcon();
    }
}

