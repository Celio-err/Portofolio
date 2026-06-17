# 🚀 Full-Stack Portfolio Engine (Django REST Framework & React)

Sistem portofolio dinamis yang mengintegrasikan backend **Django (Python)** sebagai Content Management System (CMS) melalui API JSON, dengan frontend **React.js** yang modern menggunakan **Tailwind CSS**. Semua data profil, projek, dan sertifikat dapat dikelola secara langsung melalui Django Admin.

---

## 🛠️ Tech Stack

### Backend
* **Python / Django** — Framework utama.
* **Django REST Framework (DRF)** — Penyedia endpoint API data portofolio.
* **SQLite** — Database lokal bawaan.

### Frontend
* **React.js** — Library UI untuk antarmuka pengguna yang reaktif.
* **Tailwind CSS** — Framework CSS untuk desain antarmuka modern yang cepat.
* **Vite** — Build tool untuk performa pengembangan React yang efisien.

---

## 📁 Estrutura Projetu

```text
📂 portfolio/
├── 📂 backend/               
│   ├── 📂 backend/           
│   ├── 📂 core/              
│   ├── 📂 media/             
│   └── manage.py
├── 📂 frontend/              
│   ├── 📂 src/
│   │   ├── App.jsx           
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
└── .gitignore                

⚙️ Maneira run projetu via Lokal
1. Kloning Repositori
git clone [https://github.com/Celio-err/portfolio.git](https://github.com/Celio-err/portfolio-django-react.git)
cd portfolio

2. Ativasaun Backend Django
Loke terminal, ba iha roo ka directory backend, ativa virtual enviroment, run server:
cd backend
# Ativa venv Anda (Windows)
venv\Scripts\activate

# Migrasaun ba database
python manage.py makemigrations
python manage.py migrate

# Ativa Server
python manage.py runserver
Backend API sei lao iha enderesu: http://127.0.0.1:8000/

3. Ativasaun Frontend React
Loke terminal foun tan, tama ba iha folder frontend, install dependencies, hafoin run:
cd frontend
npm install
npm run dev
Frontend React sei lao iha enderesu: http://localhost:5173/

👤 Kontributor
Celio Sousa Silva — Full-Stack Developer — @Celio-err
