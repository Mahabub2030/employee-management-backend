# Employee Management System (Backend)

A backend API for managing employee records, roles, and statuses. Built with **Node.js**, **Express**, and **Prisma**, it supports CRUD operations, enum-based statuses, and automated timestamp tracking.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Sample JSON Payloads](#sample-json-payloads)
- [License](#license)

---

## Features

- Manage employee records with personal and professional details.
- Role-based access control using enums (`ADMIN`, `SUPER_ADMIN`, `HR_ADMIN`, `GUEST`).
- Employee status tracking (`ACTIVE`, `INACTIVE`, `TERMINATED`, `ON_LEAVE`).
- Soft delete employees using `isDeleted` flag.
- Automatic `createdAt` and `updatedAt` timestamps.
- Input validation and unique constraints for critical fields like `email`, `idNumber`, and `phoneNumber`.

---

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for building REST APIs
- **Prisma ORM** – Database modeling, migrations, and queries
- **PostgreSQL** – Relational database
- **TypeScript** – Type-safe backend development

---

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/employee-management-backend.git
cd employee-management-backend
```
