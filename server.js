import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import userRoutes from './routes/user.js';
import noteRoutes from './routes/notes.js';

dotenv.config();

const app = express();
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Swingnotes API är igång!');
});

// Middlewares
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);

// 🔽 Swagger-konfiguration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Swingnotes API',
    version: '1.0.0',
    description: 'Ett API för att hantera anteckningar med inloggning',
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // JSDoc-annoterade filer
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
