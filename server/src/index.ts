import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 7800

app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}))

app.use(express.json())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API Documentation for Task Manager Backend'
    },
    servers: [{ url: 'http://localhost:'+(process.env.PORT || 7800)+'/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            dueDate: { type: 'string', format: 'date' },
            status: { type: 'string', enum: ['pending', 'completed'] }
          },
          required: ['id', 'title', 'status']
        }
      }
    },
  },
  apis: ['./src/routes/tasks.ts'] // Adjust path to your route files
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// Your routes
import tasksRoutes from './routes/tasks'
app.use('/api/tasks', tasksRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
