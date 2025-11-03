const express = require('express');
const { Op } = require('sequelize');
const Task = require('../models/task.model');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Todas las rutas están protegidas con JWT
router.use(protect);

// @route   GET /api/tasks
// @desc    Obtener todas las tareas del usuario (con filtros opcionales)
// @access  Private
router.get('/', async (req, res) => {
    try {
        const { status, priority, search } = req.query;

        const where = { userId: req.user.id };

        if (status) where.status = status;
        if (priority) where.priority = priority;
        if (search) {
            where.title = { [Op.iLike]: `%${search}%` };
        }

        const tasks = await Task.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });

        res.json({ tasks });
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
});

// @route   POST /api/tasks
// @desc    Crear una nueva tarea
// @access  Private
router.post('/', async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'El título es requerido.' });
        }

        const task = await Task.create({
            title,
            description: description || '',
            status: status || 'pending',
            priority: priority || 'medium',
            dueDate: dueDate || null,
            userId: req.user.id,
        });

        res.status(201).json({ message: 'Tarea creada exitosamente.', task });
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
});

// @route   GET /api/tasks/:id
// @desc    Obtener una tarea por ID
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, userId: req.user.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        res.json({ task });
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
});

// @route   PUT /api/tasks/:id
// @desc    Actualizar una tarea
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, userId: req.user.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        const { title, description, status, priority, dueDate } = req.body;

        await task.update({
            title: title ?? task.title,
            description: description ?? task.description,
            status: status ?? task.status,
            priority: priority ?? task.priority,
            dueDate: dueDate !== undefined ? dueDate : task.dueDate,
        });

        res.json({ message: 'Tarea actualizada exitosamente.', task });
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Eliminar una tarea
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, userId: req.user.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        await task.destroy();

        res.json({ message: 'Tarea eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
});

// @route   PATCH /api/tasks/:id/toggle
// @desc    Alternar estado completado/pendiente
// @access  Private
router.patch('/:id/toggle', async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, userId: req.user.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        await task.update({ status: newStatus });

        res.json({ message: 'Estado actualizado.', task });
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({ message: 'Error del servidor.', error: error.message });
    }
});

module.exports = router;
