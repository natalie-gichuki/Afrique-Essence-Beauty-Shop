### 🛍️ Beauty Shop – Full Stack Web Application

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
- View all orders
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

### 🛠️ Setup Instructions
1. Clone the Repo

git clone https://github.com/Elvis108-coder/Phase-5-project.git
cd Phase-5-project


2. Install Frontend Dependencies

cd frontend
npm install


3. Start Dev Server

npm run dev


4. Build for Production (Netlify)

npm run build


5. Backend Setup

```In a separate terminal:```

cd backend
pip install -r requirements.txt
flask db upgrade
flask run

### 🛡️ Authentication
JWT-based login

Role-based access (admin, user)

Tokens stored in localStorage

Axios interceptors handle token auth and error redirects



### 🌐 DEPLOYMENT LINKS

1. **Frontend(🔗netlify)** 
   ```https://688bec68eee6537f22f4ac40--glistening-fenglisu-5083bc.netlify.app/```

2. **Backend(🔗render)** 
   ```https://phase-5-project-1-eeyj.onrender.com```

Token stored in localStorage and sent with API requests

### 📊 Analytics
View total revenue, top-selling products, number of orders and active users
Dashboard charts and data visualizations
View sales per day to see total amount made in a day and total quantity of goods sold.

### 👥 Team(authors)
1. Elvis – Admin features & dashboard
  	GitHub:https://github.com/Elvis108-coder

2. Natalie – Auth & login integration
    GitHub:https://github.com/natalie-gichuki 

3. Ray – Products & category management
    GitHub:https://github.com/Raymori254 

4. Milka – Cart, orders & invoice handling
    GitHub:https://github.com/Nonniesankara


### 📜 License
MIT License - feel free to fork and improve!
