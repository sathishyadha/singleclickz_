# Single Click Studio - E-Commerce Platform

A fully functional e-commerce website for Single Click Studio, specializing in premium photo frames and customized gifts. Built with vanilla HTML, CSS, and JavaScript, with all data stored in browser LocalStorage.

## 🌐 Live Website

**Visit the live site:** [View on GitHub Pages](https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/)

> **Note:** Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name after publishing.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse products by category (A3 Frames, A4 Frames, Desktop Frames, Wall Frames)
- **Shopping Cart**: Add products to cart, modify quantities, and remove items
- **Product Customization**: Customize frames with photos, text, dates, messages, sizes, and colors
- **UPI Payment**: Secure checkout with UPI QR code payment integration
- **Invoice Generation**: Automatic invoice generation after order completion
- **Responsive Design**: Mobile-friendly interface that works on all devices

### Admin Features
- **Password Protected Admin Panel**: Secure access with password authentication
- **Product Management**: Add, edit, and delete products (CRUD operations)
- **Order Management**: View all customer orders with details
- **Sales Reports**: Generate monthly sales reports with:
  - Total sales amount
  - Number of orders
  - Top selling products
- **Dashboard**: Overview of total orders, sales, and products

## 📁 Project Structure

```
├── index.html          # Home page
├── products.html       # Products listing page
├── customize.html      # Product customization page
├── cart.html           # Shopping cart page
├── checkout.html       # Checkout and payment page
├── invoice.html        # Invoice display page
├── admin.html          # Admin panel
├── about.html          # About us page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # Core JavaScript functions
├── cart.js             # Cart page functionality
├── checkout.js         # Checkout page functionality
├── invoice.js          # Invoice page functionality
├── admin.js            # Admin panel functionality
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **LocalStorage**: Client-side data storage
- **QRCode.js**: UPI QR code generation (CDN)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd singleclick-billing
```

2. Open `index.html` in a web browser - no build process required!

3. For admin access:
   - Navigate to `admin.html`
   - Password: `singleclickz@6055`

## 💾 Data Storage

All data is stored in browser LocalStorage:
- **products**: Product catalog
- **cart**: Shopping cart items
- **orders**: Completed orders
- **sales**: Sales data for reports

**Note**: Data is stored locally in the browser and will persist until cleared.

## 🔑 Admin Credentials

- **Password**: `singleclickz@6055`

## 📱 UPI Payment Details

- **UPI ID**: `8220193883@ybl`
- Payment QR codes are generated automatically during checkout

## 🎨 Customization

### Adding New Products
1. Log in to the admin panel
2. Navigate to "Products" section
3. Click "Add New Product"
4. Fill in product details (name, category, price, description, image)

### Modifying Styles
Edit `styles.css` to customize colors, fonts, and layout. CSS variables are defined in `:root` for easy theming.

### Changing Admin Password
Edit the `ADMIN_PASSWORD` constant in `script.js`:
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

## 📄 Pages Overview

- **Home** (`index.html`): Featured products and company information
- **Products** (`products.html`): Browse all products by category
- **Customize** (`customize.html`): Customize products with photos and text
- **Cart** (`cart.html`): View and manage cart items
- **Checkout** (`checkout.html`): Customer details and UPI payment
- **Invoice** (`invoice.html`): Order invoice (printable)
- **Admin** (`admin.html`): Admin dashboard and management tools
- **About** (`about.html`): Company information
- **Contact** (`contact.html`): Contact form and information

## 🔒 Security Notes

- Admin password is stored as plain text in JavaScript (for demo purposes)
- In production, implement proper authentication
- All data is client-side only (LocalStorage)
- No server-side processing required

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

Copyright © 2024 Single Click Studio. All rights reserved.

## 📞 Contact

- **Phone**: 8220193883
- **WhatsApp**: [Click to chat](https://wa.me/918220193883)

## 🚀 Future Enhancements

Potential features for future development:
- Server-side data storage
- User authentication and accounts
- Email notifications
- Order tracking
- Product reviews and ratings
- Multiple payment gateways
- Inventory management
- Shipping integration

---

**Built with ❤️ for Single Click Studio**
