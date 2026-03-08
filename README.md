# Course Enrollment System

A full-stack web application that allows students to browse and enroll in courses, and allows administrators to manage courses and view enrollments.

## Tech Stack

**Backend:**
*   **Java 21**
*   **Spring Boot 3.2.5**
*   **Spring Security & JWT Authentication**
*   **Spring Data JPA / Hibernate**
*   **MySQL 8**
*   **Maven**

**Frontend:**
*   **React 18** (with Vite)
*   **Tailwind CSS** for modern, responsive styling
*   **Axios** for API communication
*   **React Router Dom** for navigation
*   **Lucide React** for icons

## Features

### For Students:
*   **Authentication:** Register and log in.
*   **Browse Courses:** View a list of available courses with details (instructor, capacity, current enrollments).
*   **Enroll:** Enroll in available courses (prevents double enrollment & checks capacity).
*   **My Courses:** View a personalized dashboard of enrolled courses with dates.

### For Administrators:
*   **Authentication:** Secure admin login.
*   **Course Management:** Create new courses, view all courses, edit details, and delete courses.
*   **Enrollment Tracking:** View all enrollments across the platform.

## Prerequisites

Before running the application, ensure you have the following installed:
*   **Java 21 Development Kit (JDK)**
*   **Node.js** (v18 or higher) & **npm**
*   **MySQL Server** (Running on port 3306)

## Setup & Running the Application

### 1. Database Setup
Ensure MySQL is running. Create a database named `enrollment_db` (or allow Spring Boot to auto-create it).
Update your database credentials in `backend/src/main/resources/application-local.yml` if your MySQL root password is not empty or `Armaan@28012005`.

### 2. Running the Backend (Spring Boot)
Open a terminal in the `backend` directory:
```bash
cd backend
# Build the project
mvn clean package -DskipTests
# Run the application using the local profile
java -Dspring.profiles.active=local -jar target/course-enrollment-system-1.0.0.jar
```
*The backend API will start on `http://localhost:8080`.*

### 3. Running the Frontend (React Vite)
Open a new terminal in the `frontend` directory:
```bash
cd frontend
# Install dependencies
npm install
# Start the development server
npm run dev
```
*The frontend application will be available at `http://localhost:5173`.*

## Default Test Accounts (If database is empty)
You can register new accounts, but you can also use these standard roles:
*   **Admin:** `admin@test.com` / `admin123`
*   **Student:** `alice@test.com` / `secret123`
*(Note: You will need to register these first before logging in if starting from a fresh database).*

## Project Architecture

*   **RESTful API:** Clean separation of concerns (Controllers, Services, Repositories).
*   **Security:** Role-based access control (RBAC). Admin endpoints are protected from Student access.
*   **Stateless:** Uses JSON Web Tokens (JWT) for authentication.
*   **State Management:** React Context API for global authentication state.

## License
MIT License
