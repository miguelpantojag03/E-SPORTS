# 🎮 Intelligent E-Sports Tournament Management System

![Version](https://img.shields.io/badge/version-3.1.0-blueviolet)
![License](https://img.shields.io/badge/license-MIT-green)
![Java](https://img.shields.io/badge/Java-17-orange)
![React](https://img.shields.io/badge/React-18-blue)

## 📋 Descripción
Sistema integral de gestión de torneos competitivos de E-Sports, diseñado bajo una arquitectura desacoplada y principios de ingeniería de software de alto nivel. Este proyecto demuestra el dominio de **SOLID**, **Patrones de Diseño** y **Desarrollo Full-Stack**.

## 🚀 Características Principales

### 🧠 Backend (Java Engine)
- **Patrones de Diseño**: Strategy (Rankings), Observer (Notificaciones), Singleton (Config), Factory (Torneos), Builder (Jugadores).
- **Concurrencia**: `MatchEngine` asíncrono para procesamiento paralelo de partidas.
- **Arquitectura**: Repositorio Genérico para persistencia agnóstica.
- **Validación**: Motor de reglas de negocio para integridad de datos.

### 🎨 Frontend (Enterprise UI)
- **Dashboard "Triple A"**: Interfaz inmersiva con estética Cyberpunk.
- **Persistencia**: Sincronización automática con `LocalStorage`.
- **Módulos**: Brackets interactivos, Radar Charts de habilidades, Tournament Wizard.
- **Animaciones**: Experiencia de usuario fluida con `Framer Motion`.

## 🛠️ Tecnologías
- **Core**: Java 17, Collections API, Threads.
- **UI**: React.js, Vite, Tailwind-inspired CSS.
- **Visualización**: Recharts (Radar & Area Charts), Lucide Icons.

## 📦 Instalación y Uso

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
El código fuente se encuentra en `src/com/esports/`.
Compila y ejecuta `Main.java` para ver la lógica central en acción.

---

Desarrollado con ❤️ para el proyecto final de Diseño de Software.
© 2026 E-Sports Engine.
