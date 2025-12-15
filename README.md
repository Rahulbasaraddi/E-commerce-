# E-Commerce Application

A full-stack e-commerce web application built with Spring Boot and vanilla JavaScript, featuring JWT authentication and a modern responsive UI.

## 🚀 Features

- **JWT Authentication** - Secure login and registration system
- **Product Management** - Add, view, update, and delete products
- **Shopping Cart** - Add items to cart, adjust quantities, and checkout
- **Responsive Design** - Modern UI with glassmorphism effects
- **Image Upload** - Product images stored in database

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.2.6**
- **Spring Security** - JWT-based authentication
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Database
- **Lombok** - Reduce boilerplate code

### Frontend
- **HTML5 / CSS3** - Semantic markup with modern styling
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage** - Cart and token persistence

## 📋 Prerequisites

- Java 21+
- Maven 3.9+
- PostgreSQL 15+

## ⚙️ Setup

### 1. Database Setup
Create a PostgreSQL database:
```sql
CREATE DATABASE "E-coomerce";
```

### 2. Configure Application
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/E-coomerce
spring.datasource.username=postgres
spring.datasource.password=root
```

### 3. Run the Application
```bash
./mvnw spring-boot:run
```

### 4. Access the Application
Open your browser and navigate to:
```
http://localhost:8080/
```

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |

### Products (Protected - Requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pro` | Get all products |
| GET | `/api/pro/{id}` | Get product by ID |
| GET | `/api/pro/{id}/image` | Get product image (Public) |
| POST | `/api/save` | Add new product |
| PUT | `/api/pro/{id}` | Update product |
| DELETE | `/api/pro/{id}` | Delete product |

## 📁 Project Structure

```
src/main/java/com/rsb/Ecomm/
├── config/
│   ├── SecurityConfig.java
│   └── JwtAuthenticationFilter.java
├── controller/
│   ├── AuthController.java
│   └── ProductController.java
├── entity/
│   ├── Users.java
│   ├── UserPrincipal.java
│   └── Product.java
├── repository/
│   ├── UserRepository.java
│   └── ProductRepository.java
└── service/
    ├── JwtService.java
    ├── MyUserDetailsService.java
    └── ProductService.java

src/main/resources/static/
├── index.html
├── login.html
├── register.html
├── add_product.html
├── cart.html
├── styles.css
├── app.js
└── header.js
```

## 🧪 Usage

1. **Register** - Create a new account at `/register.html`
2. **Login** - Sign in at `/login.html` to get your JWT token
3. **Browse Products** - View all products on the dashboard
4. **Add to Cart** - Click "Add" on any product
5. **Checkout** - View cart and complete purchase



## 👤 Author

**Rahulbasaraddi**
- GitHub: [@Rahulbasaraddi](https://github.com/Rahulbasaraddi)
