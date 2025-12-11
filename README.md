# VaxPlus - Vaccine Management System 🩺

![VaxPlus](https://img.shields.io/badge/VaxPlus-Vaccine%20Management%20System-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite)

A modern, responsive, and professional vaccine management system built with React that provides comprehensive vaccination tracking and management capabilities.

**🌐 Live App:** [https://vaxplus-frontend.vercel.app/](https://vaxplus-frontend.vercel.app/)  
**⚙️ API:** [https://vaxplus-backend.vercel.app/api/v1/](https://vaxplus-backend.vercel.app/api/v1/)

---

## Overview

**VaxPlus** is a full-stack **Vaccine Management System** designed to simplify and digitize vaccination operations.  
It enables users to **register, book vaccine doses, manage campaigns, and track vaccination records** — all from one place.

---

## Features at a Glance

🔹 **Authentication & Authorization** — Secure user login, registration, and logout  
🔹 **Role-Based Access Control** — Patient, Doctor, and Admin dashboards  
🔹 **Vaccine Campaigns** — View and manage active vaccination campaigns  
🔹 **Dose Booking** — Patients can book and track vaccine doses  
🔹 **Doctor Panel** — Manage patients, update vaccination statuses  
🔹 **Patient Dashboard** — Track vaccine schedules and booking status  
🔹 **User Reviews & Feedback** — Share vaccination experiences  
🔹 **Modern UI/UX** — Responsive, minimal, and accessible design  
🔹 **Smooth API Integration** — Using Axios with DRF backend  
🔹 **Fast & Lightweight** — Built with Vite and optimized React components  
🔹 **Payment & Billing** — Secure online payments for premium vaccination campaigns and donations for continue free health campaign.

---

## Architecture

```text
Frontend (React + Tailwind + DaisyUI)
          │
          │ Axios API Requests
          ▼
Backend (Django REST Framework)
          │
          │ Database (PostgreSQL / SQLite)
          ▼
       Full-stack Vaccine Management
```
---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Routing** | [React Router](https://reactrouter.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Swiper JS** | For image sliders and carousels |

---

## Project Structure

```
vaxplus-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services and configurations
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles and Tailwind config
│   └── App.jsx           # Main application component
├── package.json
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```
---

## Backend Overview
The **VaxPlus Backend**, powered by **Django REST Framework**, handles all API requests and authentication logic.  

| Category       | Technologies & Tools                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **Framework**  | [Django REST Framework](https://www.django-rest-framework.org/) — Robust backend API development |
| **Database**   | [PostgreSQL](https://www.postgresql.org/) — Reliable and scalable data management                |
| **Deployment** | [Vercel](https://vercel.com/) — Fast and serverless cloud hosting platform                       |

📦 **Backend Repo:** [VaxPlus Backend on GitHub](https://github.com/anis191/vaxplus-backend)<br>
🔗 **API Base URL:** [https://vaxplus-backend.vercel.app/api/v1/](https://vaxplus-backend.vercel.app/api/v1/)

---

## 💻 Author
**Anisul Alam**  
Full-Stack Developer | Django | React | PostgreSQL

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anisulalam/)
[![Portfolio](https://img.shields.io/badge/-Portfolio-000?style=flat&logo=vercel&logoColor=white)](https://anisulalam.vercel.app/)

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**

</div>
