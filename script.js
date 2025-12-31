// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Photo Upload Functionality
const photoUpload = document.getElementById('photoUpload');
const uploadArea = document.getElementById('uploadArea');
const previewImage = document.getElementById('previewImage');
const previewPhoto = document.getElementById('previewPhoto');

if (photoUpload && uploadArea) {
    // Click to upload
    uploadArea.addEventListener('click', () => {
        photoUpload.click();
    });

    // File selection
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                previewImage.src = imageUrl;
                previewImage.style.display = 'block';
                
                // Update preview section
                if (previewPhoto) {
                    previewPhoto.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
                }
                
                // Hide upload placeholder
                const placeholder = uploadArea.querySelector('.upload-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#6366f1';
        uploadArea.style.background = '#f9fafb';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#e5e7eb';
        uploadArea.style.background = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e5e7eb';
        uploadArea.style.background = 'transparent';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            photoUpload.files = e.dataTransfer.files;
            const event = new Event('change', { bubbles: true });
            photoUpload.dispatchEvent(event);
        }
    });
}

// Real-time Preview Updates
const nameText = document.getElementById('nameText');
const dateText = document.getElementById('dateText');
const messageText = document.getElementById('messageText');
const previewName = document.getElementById('previewName');
const previewDate = document.getElementById('previewDate');
const previewMessage = document.getElementById('previewMessage');

if (nameText && previewName) {
    nameText.addEventListener('input', () => {
        previewName.textContent = nameText.value || '';
    });
}

if (dateText && previewDate) {
    dateText.addEventListener('input', () => {
        previewDate.textContent = dateText.value || '';
    });
}

if (messageText && previewMessage) {
    messageText.addEventListener('input', () => {
        previewMessage.textContent = messageText.value || '';
    });
}

// WhatsApp Order Functionality
const orderBtn = document.getElementById('orderBtn');

if (orderBtn) {
    orderBtn.addEventListener('click', () => {
        // Get form values
        const name = nameText ? nameText.value : '';
        const date = dateText ? dateText.value : '';
        const message = messageText ? messageText.value : '';
        const size = document.querySelector('input[name="size"]:checked')?.value || '';
        const color = document.querySelector('input[name="color"]:checked')?.value || '';
        
        // Check if photo is uploaded
        const hasPhoto = photoUpload && photoUpload.files.length > 0;
        
        // Build WhatsApp message
        let whatsappMessage = "Hi, I'd like to place an order:\n\n";
        
        if (name) {
            whatsappMessage += `Name/Title: ${name}\n`;
        }
        if (date) {
            whatsappMessage += `Date: ${date}\n`;
        }
        if (message) {
            whatsappMessage += `Message: ${message}\n`;
        }
        if (size) {
            whatsappMessage += `Size: ${size}\n`;
        }
        if (color) {
            whatsappMessage += `Color: ${color}\n`;
        }
        
        if (!hasPhoto) {
            whatsappMessage += "\n⚠️ Please note: Photo not uploaded. I'll share it separately.";
        }
        
        whatsappMessage += "\nPlease confirm the order details.";
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/918220193883?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Build WhatsApp message
        let whatsappMessage = `New Enquiry from Website:\n\n`;
        whatsappMessage += `Name: ${name}\n`;
        whatsappMessage += `Email: ${email}\n`;
        whatsappMessage += `Phone: ${phone}\n`;
        whatsappMessage += `Subject: ${subject}\n`;
        whatsappMessage += `Message: ${message}\n`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/918220193883?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        alert('Thank you for your message! We will contact you soon via WhatsApp.');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .review-card, .quality-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize cart and products
    initializeData();
    updateCartIcon();
});

// Update cart icon on all pages
if (typeof updateCartIcon === 'function') {
    document.addEventListener('DOMContentLoaded', updateCartIcon);
}

// ==================== DATA MANAGEMENT ====================

// Initialize LocalStorage data
function initializeData() {
    // Initialize products if not exists
    if (!localStorage.getItem('products')) {
        const defaultProducts = [
            { id: '1', name: 'A3 Premium Frame', category: 'A3 Frames', price: 599, description: 'Premium quality A3 frame', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
            { id: '2', name: 'A3 Deluxe Frame', category: 'A3 Frames', price: 799, description: 'Deluxe A3 frame', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop' },
            { id: '3', name: 'A3 Elegant Frame', category: 'A3 Frames', price: 699, description: 'Elegant A3 frame', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
            { id: '4', name: 'A4 Classic Frame', category: 'A4 Frames', price: 399, description: 'Classic A4 frame', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop' },
            { id: '5', name: 'A4 Premium Frame', category: 'A4 Frames', price: 499, description: 'Premium A4 frame', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
            { id: '6', name: 'A4 Modern Frame', category: 'A4 Frames', price: 449, description: 'Modern A4 frame', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
            { id: '7', name: 'Desktop Frame Set (3pc)', category: 'Desktop Frames', price: 799, description: 'Set of 3 desktop frames', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop' },
            { id: '8', name: 'Desktop Premium Frame', category: 'Desktop Frames', price: 599, description: 'Premium desktop frame', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
            { id: '9', name: 'Desktop Mini Frame', category: 'Desktop Frames', price: 299, description: 'Mini desktop frame', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
            { id: '10', name: 'Wall Frame Collection', category: 'Wall Frames', price: 1299, description: 'Wall frame collection', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop' },
            { id: '11', name: 'Wall Premium Frame', category: 'Wall Frames', price: 999, description: 'Premium wall frame', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
            { id: '12', name: 'Wall Gallery Set', category: 'Wall Frames', price: 1499, description: 'Gallery set of wall frames', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    
    // Initialize cart if not exists
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Initialize orders if not exists
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
}

// ==================== CART MANAGEMENT ====================

// Get cart from LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Save cart to LocalStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(product, customization = {}) {
    const cart = getCart();
    const cartItem = {
        id: Date.now().toString(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        customization: customization
    };
    cart.push(cartItem);
    saveCart(cart);
    updateCartIcon();
    return cartItem;
}

// Remove item from cart
function removeFromCart(itemId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== itemId);
    saveCart(newCart);
    updateCartIcon();
    return newCart;
}

// Update cart item quantity
function updateCartQuantity(itemId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === itemId);
    if (item) {
        if (quantity <= 0) {
            return removeFromCart(itemId);
        }
        item.quantity = quantity;
        saveCart(cart);
        updateCartIcon();
    }
    return cart;
}

// Clear cart
function clearCart() {
    saveCart([]);
    updateCartIcon();
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart icon badge
function updateCartIcon() {
    const cart = getCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.getElementById('cartIcon');
    const cartBadge = document.getElementById('cartBadge');
    
    if (cartIcon) {
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
        }
    }
}

// ==================== PRODUCT MANAGEMENT ====================

// Get all products
function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

// Get product by ID
function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

// Save product
function saveProduct(product) {
    const products = getProducts();
    if (product.id) {
        // Update existing
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            products[index] = product;
        }
    } else {
        // Add new
        product.id = Date.now().toString();
        products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));
    return product;
}

// Delete product
function deleteProduct(id) {
    const products = getProducts();
    const newProducts = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(newProducts));
    return newProducts;
}

// ==================== ORDER MANAGEMENT ====================

// Create order
function createOrder(customerData, cartItems) {
    const order = {
        orderId: 'ORD' + Date.now(),
        date: new Date().toISOString(),
        customer: customerData,
        items: cartItems,
        total: getCartTotal(),
        status: 'completed'
    };
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart after order
    clearCart();
    
    return order;
}

// Get all orders
function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

// Get order by ID
function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(o => o.orderId === orderId);
}

// ==================== SALES REPORT ====================

// Calculate sales for month/year
function calculateSales(month, year) {
    const orders = getOrders();
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getMonth() === month && orderDate.getFullYear() === year;
    });
    
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = filteredOrders.length;
    
    // Top selling products
    const productSales = {};
    filteredOrders.forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.productName]) {
                productSales[item.productName] = 0;
            }
            productSales[item.productName] += item.quantity;
        });
    });
    
    const topProducts = Object.entries(productSales)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
    
    return {
        totalSales,
        orderCount,
        topProducts,
        orders: filteredOrders
    };
}

// ==================== ADMIN AUTHENTICATION ====================

const ADMIN_PASSWORD = 'singleclickz@6055';

function checkAdminPassword(password) {
    return password === ADMIN_PASSWORD;
}

// ==================== UPI QR CODE ====================

function generateUPIQR(amount) {
    const upiId = '8220193883@ybl';
    const note = 'Single Click Studio Order';
    // Generate proper UPI payment URL
    const upiUrl = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    return upiUrl;
}

// ==================== INVOICE GENERATION ====================

function generateInvoice(orderId) {
    const order = getOrderById(orderId);
    if (!order) return null;
    
    return {
        orderId: order.orderId,
        date: new Date(order.date).toLocaleString('en-IN'),
        items: order.items,
        total: order.total
    };
}

