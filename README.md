# ChatBotBAlmassora

Un chatbot inteligente desarrollado para responder preguntas sobre Almassora. La aplicación combina un backend de Spring Boot con un frontend en React/Vite.

## 📋 Descripción

ChatBotBAlmassora es una aplicación web que permite:
- Responder preguntas frecuentes de manera rápida y eficiente
- Administrar preguntas y respuestas con una interfaz intuitiva
- Visualizar estadísticas de uso y preguntas frecuentes
- Entrenar el chatbot con nuevos datos
- Gestionar preguntas sin respuesta

## 🛠️ Tecnologías

### Backend
- **Java 21** con Spring Boot 4.0.0
- **PostgreSQL/H2** para base de datos
- **Maven** para gestión de dependencias
- **REST API** con CORS habilitado

### Frontend
- **React 18** con Vite
- **JavaScript/JSX** para componentes interactivos
- **CSS personalizado** para estilos

## 📁 Estructura del Proyecto

```
ChatBotBAlmassora/
├── demo/                    # Backend Spring Boot
│   ├── pom.xml             # Configuración Maven
│   └── src/main/java/      # Código fuente Java
│       └── com/ChatBot/demo/
│           ├── controller/ # Controladores REST
│           ├── service/    # Lógica de negocio
│           ├── model/      # Entidades
│           ├── repository/ # Acceso a datos
│           ├── dto/        # Data Transfer Objects
│           └── config/     # Configuración
├── PaginasReact/           # Frontend React
│   └── PaginasFront/
│       ├── src/
│       │   ├── components/ # Componentes React
│       │   ├── paginas/    # Páginas principales
│       │   └── context/    # Context API
│       └── package.json    # Dependencias NPM
└── README.md               # Este archivo
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Java 21+
- Node.js 18+
- Maven 3.9+
- PostgreSQL (opcional, H2 para desarrollo)

### Backend
```bash
cd demo
mvn spring-boot:run
```
El servidor estará disponible en `https://chat2.valenciainformada.com`

### Frontend
```bash
cd PaginasReact/PaginasFront
npm install
npm run dev
```

## 📡 Endpoints API

### Chat
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/chat` | Responder a una pregunta (Deprecated) |
| POST | `/api/chat_fast` | Responder a una pregunta (versión rápida) |
| POST | `/api/search` | Buscar preguntas por query |

### Preguntas (QA)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api` | Obtener preguntas sin respuesta |
| GET | `/api/admin` | Obtener preguntas sin respuesta (admin) |
| PATCH | `/api/` | Actualizar respuesta de una pregunta |
| DELETE | `/api/{id}` | Eliminar una pregunta |
| GET | `/api/cargar` | Cargar preguntas desde archivo JSON |

### Preguntas Rápidas (Fast QA)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/fast` | Obtener todas las preguntas rápidas |
| PATCH | `/api/fast` | Actualizar una pregunta rápida |
| DELETE | `/api/fast/{id}` | Eliminar una pregunta rápida |

### Entrenamiento
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/fast_train` | Entrenar chatbot (versión rápida) |

### Estadísticas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estadisticas` | Obtener todas las estadísticas |
| GET | `/api/estadisticas/preguntasfrecuentes` | Obtener top 5 preguntas últimas horas |
| GET | `/api/estadisticas/totalpreguntas` | Obtener total de preguntas |
| GET | `/api/estadisticas/preguntasSinRespuesta` | Contar preguntas sin respuesta |
| GET | `/api/estadisticas/preguntasConRespuesta` | Contar preguntas con respuesta |
| GET | `/api/estadisticas/barras` | Obtener datos para gráfico de barras |
| GET | `/api/estadisticas/queue` | Obtener estado de la cola de entrenamiento |
| POST | `/api/estadisticas/entrenar` | Entrenar el chatbot |

### Páginas (Frontend)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Página de inicio |
| GET | `/menu` | Menú principal |
| GET | `/edit` | Página de edición |
| GET | `/estadisticas` | Página de estadísticas |
| GET | `/login` | Página de login |

## 📊 Modelos de Datos Principales

### QA (Question & Answer)
- `id`: Identificador único
- `pregunta`: Texto de la pregunta
- `respuesta`: Respuesta del chatbot
- `frecuencia`: Número de veces preguntado
- (Otros campos según modelo)

### Entrenamiento
- `id`: Identificador único
- `qa`: Referencia a QA
- `fecha`: Fecha de entrenamiento
- (Otros campos según modelo)

## 🔐 Seguridad

- CORS habilitado para desarrollo (revisar en producción)
- Validación de entrada en endpoints
- Manejo de excepciones centralizado

## 📝 Configuración

### Backend (application.properties)
```properties
# Ver: demo/src/main/resources/application.properties
```

### Frontend (vite.config.js)
```javascript
// Ver: PaginasReact/PaginasFront/vite.config.js
```

## 🧪 Pruebas

### Backend
```bash
cd demo
mvn test
```

### Frontend
```bash
cd PaginasReact/PaginasFront
npm run test
```

## 📦 Build

### Backend (WAR)
```bash
cd demo
mvn clean package
```
Archivo generado: `demo/target/ChatBotB-0.0.1-SNAPSHOT.war`

### Frontend
```bash
cd PaginasReact/PaginasFront
npm run build
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ✉️ Contacto

Para preguntas o sugerencias, contacta con el equipo de desarrollo.

---

**Última actualización:** Febrero 2026
