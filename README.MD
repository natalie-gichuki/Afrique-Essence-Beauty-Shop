 🛍️ Beauty Shop – Full Stack Web Application

Beauty Shop is a full-stack e-commerce platform for browsing and managing beauty products. It includes a customer-facing storefront and a secure admin dashboard for managing products, viewing analytics, and generating invoices.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Redux Toolkit, i18next
- **Backend**: Flask, SQLAlchemy, Marshmallow, Alembic, JWT Auth
- **Database**: PostgreSQL
- **Deployment**: Render for backend and netlify for frontend

## 📦 Features

### 🧑 Customer Side
- View beauty products
- Search, filter, and sort
- Add to cart and checkout
- Invoice generation
- Multi-language support (i18next)

### 👩‍💼 Admin Dashboard
- Login & protected routes
- Add, edit, delete products
- View all orders and invoices
- Sales analytics and reporting
- Filter data by date


## 🗂️ Folder Structure

phase-5-project/
├── backend/
│ ├── app/
│ │ ├── models/ # SQLAlchemy models
│ │ ├── routes/ # Flask API routes
│ │ ├── schemas/ # Marshmallow schemas
│ │ ├── templates/ # Jinja2 templates (e.g., invoice)
│ │ ├── tests/ # Unit and integration tests
│ │ ├── utils/ # Utility functions
│ │ ├── init.py # App factory and setup
│ │ ├── config.py # App config (env, DB, etc.)
│ │ └── swagger.json # Optional: API documentation schema
│ ├── instance/ # Local config instance
│ ├── migrations/ # Alembic DB migrations
│ ├── .env # Flask environment variables
│ ├── run.py # Flask app entry point
│ ├── Dockerfile # Container setup
│ ├── Pipfile # Pipenv dependencies
│ ├── requirements.txt # (Optional) pip install fallback
│ └── gunicorn_config.py # Gunicorn server config (for prod)
│
├── frontend/
│ ├── public/ # Static files (favicon, etc.)
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Views (Home, Admin, Product, Cart, etc.)
│ │ ├── services/ # Axios API calls
│ │ ├── slices/ # Redux Toolkit slices
│ │ ├── i18n.js # Localization config
│ │ └── main.jsx # App entry point
│ ├── .env # Frontend environment variables
│ ├── index.html # App HTML template
│ ├── package.json # Project metadata and dependencies
│ ├── tailwind.config.js # Tailwind config
│ ├── vite.config.js # Vite bundler config
│ └── postcss.config.js # PostCSS plugins

## ⚙️ Getting Started

### Backend
cd backend
pipenv install
pipenv shell
flask db upgrade
flask run
🔐 Authentication
JWT-based admin login

Token stored in localStorage and sent with API requests

📊 Analytics
View total revenue, top-selling products

Filter reports by date or category

Dashboard charts and data visualizations
👥 Team
Elvis – Admin features & dashboard
  	GitHub:https://github.com/Elvis108-coder
Natalie – Auth & login integration
    GitHub:https://github.com/natalie-gichuki 
Ray – Products & category management
    GitHub:https://github.com/Raymori254 
Milka – Cart, orders & invoice handling
    GitHub:https://github.com/Nonniesankara
📜 License
MIT License
