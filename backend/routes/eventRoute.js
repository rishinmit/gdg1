const express = require('express');
const Event = require("../models/eventModel");
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Create event
router.post('/events', isAuthenticated, isAdmin, async (req, res) => {
    const { eventName, location, description, image, eventDate, eventTime } = req.body;

    try {
        const event = await Event.create({
            eventName,
            location,
            description,
            image,
            eventDate,
            eventTime,
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get event by ID
router.get('/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update event
router.put('/events/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { eventName, location, description, image, eventDate, eventTime } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {
                eventName,
                location,
                description,
                image,
                eventDate,
                eventTime,
            },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete event
router.delete('/events/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
