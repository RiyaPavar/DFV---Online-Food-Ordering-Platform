# 🍽️ Deshi Food Villa – Full-Stack Food Ordering Platform

Deshi Food Villa is a dynamic and modern web application designed for food ordering and restaurant management. Built using the **MERN stack** with **Next.js** and **Tailwind CSS**, this platform supports customer-facing functionality alongside robust admin and employee panels.

It allows customers to browse menus, filter by categories, add items to the cart, and place orders, while admins and employees can manage food items, availability, orders, and offers through a secure dashboard.

---

## 🚀 Live Demo

[🔗 WIll be Live Soon](https://your-live-url.com)  


---

## 🛠️ Tech Stack

### 🔹 Frontend
- **Next.js** – Server-side rendering & routing
- **React.js** – Interactive UI components
- **Tailwind CSS** – Utility-first responsive styling

### 🔹 Backend
- **Node.js & Express.js** – RESTful APIs and server logic
- **MongoDB** – NoSQL database for persistent storage
- **Mongoose** – ODM for MongoDB

### 🔹 Tools & Integrations
- **Cloudinary** – Image storage and optimization
- **Multer** – File uploads handling
- **JWT** – Authentication & protected routes *(planned or in-progress)*
- **Axios** – API requests

---

## 🎯 Features

### 👨‍🍳 Client Panel
- Browse menu items with images and prices
- Filter items by category (e.g., Snacks, Biryani, Beverages)
- Add items to cart with quantity selection
- Real-time cart updates
- Responsive and mobile-friendly UI

### 🧑‍💼 Admin Panel
- Admin authentication and protected routes
- Add / Update / Delete food items
- Toggle item availability (e.g., Available / Not Available)
- Upload item images via **Cloudinary**
- View & manage customer orders
- Add and manage daily discount offers

### 👷 Employee Panel
- Role-based access to manage specific modules (orders, availability)
- Lightweight dashboard view for operational staff

### 🎁 Offers & Discounts
- Admin can add dynamic daily offers with:
  - % discount
  - Linked food items
  - Expiry option
- System detects eligible items during checkout and applies discounts

### ⚙️ Performance & Optimization
- Server-side rendering (SSR) for faster page loads using **Next.js**
- Optimized image delivery via Cloudinary
- Pagination for items and orders to reduce loading time

---

## 📸 Screenshots
# Home page

<img width="1896" height="896" alt="image" src="https://github.com/user-attachments/assets/0afef86e-fa54-406c-bcbc-6a20f2653408" />

# Admin Login Section

<img width="1909" height="889" alt="image" src="https://github.com/user-attachments/assets/e6ffc732-402a-4bd4-b5ea-64c7381b376a" />

# Admin Panel


<img width="1916" height="880" alt="image" src="https://github.com/user-attachments/assets/7a955265-844e-46e8-a833-098e5493550e" />

# Item Mangament Panel


<img width="1891" height="888" alt="image" src="https://github.com/user-attachments/assets/519f7535-6237-4a07-804e-ca12b79b09f1" />





---

## 📂 Folder Structure (Simplified)

```bash
├── Deshi-food-villa/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── dfvbackend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
├── uploads/ (temporary, if using multer)
├── .env
├── README.md
└── package.json
````

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and include:

```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

---

## 💻 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/raj-singhh/DFV-RESTRO
cd deshi-food-villa
```

### 2. Install Dependencies

#### For Client

```bash
cd deshi-foof-villa
npm install
```

#### For Server

```bash
cd dfvbackend
npm install
```

### 3. Configure Environment

Create `.env` in `server/` and `client/` with required variables.

### 4. Run Development Servers

#### Backend (Port 5000)

```bash
cd dfvbackend
npm run dev
```

#### Frontend (Port 3000)

```bash
cd deshi-food-villa
npm run dev
```

---

## ✅ Future Enhancements

* 🔐 Google & OTP-based login/signup
* 📦 Razorpay or Stripe integration for payments
* 📊 Analytics dashboard for admins
* 📱 PWA (Progressive Web App) support
* 🔔 Real-time order notifications using WebSockets

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests to improve the project.
Follow conventional commits and maintain code formatting.

---

## 🙋‍♂️ Author

**Riya Pavar**
📧 [Email](mailto:riyapawar1211@gmail.com)
🌐 [Portfolio](https://riyaportfolio7060.netlify.app/)
🐙 [GitHub](https://github.com/RiyaPavar)

---

> If you like this project, don’t forget to ⭐ the repository and share it!





