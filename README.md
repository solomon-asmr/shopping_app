Shopping App Project Overview
-------------------------------
lech-lecha is a full-stack e-commerce shoe store application built with React and Node.js. Here's a concise breakdown:

🎯 Project Structure
----------------------
Client (React Frontend)
------------------------


App.js - Main app component with routing, cart state management, and localStorage persistence
NavBar.js - Navigation with logo, home link, and shopping cart summary
HomePage.js - Landing page with carousel and product grid
Carousel.js - Bootstrap image carousel with shop photos
ProductGrid.js & ProductCard.js - Display and manage product listings
Cart.js - Sidebar shopping cart with item management
OrderPlacement.js - Checkout form for shipping details and order submission

Server (Node.js Backend)
------------------------

server.js - Express server with three main endpoints:
GET /products - Fetch all shoe products from MongoDB
POST /upload - Add new products (admin feature) with image upload via Multer
POST /api/orders - Submit customer orders
static/ - Admin panel for creating products
🛠️ Key Features
✅ Product Browsing - View shoes in grid layout with details
✅ Shopping Cart - Add/remove items, update quantities, persistent storage
✅ Order Checkout - Shipping form with delivery options (free/fast $10)
✅ Admin Panel - Upload new products with images
✅ Responsive Design - Bootstrap + custom CSS
✅ Database - MongoDB for products and orders

📦 Tech Stack
----------------
Frontend: React 18, React Router v6, Bootstrap 4, React Icons
Backend: Express, MongoDB (mongojs), Multer (file uploads)
State Management: React hooks + localStorage
