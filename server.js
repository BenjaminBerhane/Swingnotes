import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

import userRoutes from './routes/user.js';
import noteRoutes from './routes/notes.js';
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
