import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SwingNotes API',
      version: '1.0.0',
      description: 'API för att hantera anteckningar med JWT-inloggning',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
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
  },
  apis: ['./routes/*.js'], // Läser swagger-kommentarer i dina routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
