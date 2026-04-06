# 🎓 Course Management System (CMS Pro) - Angular 19

A sophisticated, high-performance Learning Management System built with **Angular 19**. This project showcases advanced architectural patterns, including **NgRx** for state management, **Lazy Loading** for performance, and a fully responsive **Admin Dashboard**.

## 🚀 Advanced Technical Architecture

### ⚡ Performance Optimization: Lazy Loading
To ensure lightning-fast initial load times, the application implements **Lazy Loading** for all major feature modules. Components are only loaded when the user navigates to their specific routes, significantly reducing the initial bundle size.
* **Admin Module**: Lazily loaded for administrative tasks.
* **Instructor Module**: Dedicated lazy-loaded path for course management.
* **Student Module**: Optimized path for learning and course discovery.

### 🧠 State Management: NgRx (Redux Pattern)
The project utilizes **NgRx** for a centralized and predictable state management system.
* **Actions & Reducers**: Custom logic for handling `Courses`, `Users`, `Enrollments`, `Lessons`, and `Wishlist`.
* **Effects**: Side-effect management for asynchronous API calls.
* **Selectors**: Highly optimized data retrieval from the store.

---

## 🌟 Comprehensive Feature List

### 🖥️ Professional Admin Dashboard
- **Metric Analytics**: Custom-designed cards showing total Students (4), Active Courses (6), and Instructors (3).
- **Admin Layout**: A specialized sidebar and header layout for administrative control.
- **Quick Actions**: Immediate access to "Manage Users" and "Add New Course" with interactive UI.

### 👨‍🏫 Instructor Interface
- **Course Authoring**: Tools for instructors to create and manage their curriculum.
- **Lesson Management**: Specialized components for organizing course content.

### 👩‍🎓 Student Portal
- **Course Marketplace**: Modern card-based UI for browsing available courses.
- **My Learning**: A personalized area for tracked enrollments and wishlist items.

### 🔒 Security & Routing
- **Role-Based Access Control (RBAC)**: Strict `AuthGuard` and `RoleGuard` implementations to protect routes based on user type (Admin/Instructor/Student).
- **403 Access Denied**: A custom-designed "Unauthorized" page for handling restricted access attempts.
- **Dynamic Navbar**: Automatically adjusts links and visibility based on the user's authentication state and role.

---

## 🛠️ Tech Stack & Tools
- **Framework**: Angular 19 (Standalone Architecture).
- **State Management**: NgRx Store, Effects, and DevTools.
- **UI Framework**: Bootstrap 5 + FontAwesome Icons.
- **Backend Simulation**: JSON Server (REST API).
- **Environment**: Multi-environment configuration (Dev/Prod).

## 📁 Key Directory Structure
- `src/app/Store`: Centralized NgRx state management.
- `src/app/Guards`: Security logic for route protection.
- `src/app/Models`: TypeScript interfaces for robust type checking (`Course`, `User`, `Statistics`).
- `src/app/Components`: Feature-based component organization (Admin, Auth, Student, Shared).

---
*Developed with ❤️ by [Sohila Tarek](https://github.com/sohila558) - Backend & Frontend Engineer*