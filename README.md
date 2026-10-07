# Stall Booking System

A full-stack stall booking system for exhibitions, fairs, and marketplace events.

## Tech stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Auth: JWT-based authentication
- Payment support: Stripe / Razorpay ready

## Project structure
```bash
stall-booking-system/
├── backend/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── .gitignore
```

## Quick start

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Default access
- Frontend URL: http://localhost:5173
- Backend URL: http://localhost:5000/api

## Features included
- User authentication
- Stall listing and filtering
- Booking system flow
- Admin dashboard
- Payment status support
- Responsive UI

## Notes
This starter project is designed as a practical foundation for a real stall booking platform and can be extended with database integrations, role-based logic, real payment gateways and deployment configuration.
