require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Importar modelos para que Sequelize los registre
require('./models/user.model');
require('./models/task.model');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middlewares globales
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Task Manager API funcionando correctamente 🚀', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({ message: `Ruta ${req.originalUrl} no encontrada.` });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ message: 'Error interno del servidor.', error: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📋 API Docs:`);
        console.log(`   POST /api/auth/register`);
        console.log(`   POST /api/auth/login`);
        console.log(`   GET  /api/auth/me`);
        console.log(`   GET  /api/tasks`);
        console.log(`   POST /api/tasks`);
        console.log(`   GET  /api/tasks/:id`);
        console.log(`   PUT  /api/tasks/:id`);
        console.log(`   DELETE /api/tasks/:id`);
        console.log(`   PATCH /api/tasks/:id/toggle\n`);
    });
};

start();
