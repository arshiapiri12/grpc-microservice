# 🛍️ Sample Shop – gRPC Microservice  

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo"/>
  <img src="https://grpc.io/img/logos/grpc-icon-color.png" width="100" alt="gRPC Logo"/>
  <img src="https://www.docker.com/wp-content/uploads/2023/05/symbol_docker-1024x939.png" width="90" alt="Docker Logo"/>
</p>  

A **production-ready microservice** built with [NestJS](https://nestjs.com) and **gRPC**, designed for **Shop Management** (CRUD + File Upload/Download).  
This project is structured with **modular architecture**, includes logging, interceptors, middlewares, and is fully **Dockerized**.  

---

## ✨ Features  

⚡ High-performance gRPC communication

🏗️ Modular architecture: controllers, services, DTOs, and modules

🛠️ CRUD operations for Shops: create, update, find, get, delete

📤 File upload & download over gRPC

📏 DTO-based validation for request/response

🐳 Fully Dockerized for easy deployment

📊 Integrated logging & interceptors

✅ Production-ready structure for scalability and maintainability

---

## 📁 Project Structure  

```bash
src/
 ├── commons/              # Shared DTOs, utilities
 │   └── dto/              # Common reusable DTOs
 │       ├── phone-number.dto.ts
 │       ├── username.dto.ts
 │       └── uuid.dto.ts
 │
 ├── factory/              # Configs & factories (logger, etc.)
 │   └── winston.config.ts
 │
 ├── interceptors/         # Global interceptors
 │   └── errors.interceptor.ts
 │
 ├── middlewares/          # Middlewares
 │   └── app-logger.middleware.ts
 │
 ├── protos/               # gRPC proto definitions
 │   ├── api-gateway.proto
 │   ├── commons.proto
 │   └── shops.proto
 │
 ├── shop/                 # Main Shop microservice
 │   ├── dto/              # Shop-specific DTOs
 │   ├── enum/             # Shop enums
 │   ├── schema/           # Schemas (if using DB/validation)
 │   ├── schemas/          # Data schemas
 │   ├── utils/            # Utility helpers
 │   ├── shop.controller.ts
 │   ├── shop.service.ts
 │   └── shop.module.ts
 │
 └── main.ts               # Application entrypoint

 ```

## 📚 Additional Notes
Logging: Using Winston, integrated with interceptors and middlewares

Validation: DTOs validated with NestJS validation pipes

Scalability: Modular architecture allows adding microservices easily

File Handling: Streams large files efficiently over gRPC

## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com)
- [gRPC Documentation](https://grpc.io/docs/)
- [Docker Documentation](https://docs.docker.com/)






