import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage for reminders (replace with database in production)
let reminders = [];

// Create a new reminder
router.post('/create', async (req, res) => {
  try {
    const { clientId, clientName, eventType, date, notes } = req.body;

    // Validate required fields
    if (!clientId || !clientName || !eventType || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create new reminder
    const reminder = {
      id: uuidv4(),
      clientId,
      clientName,
      eventType,
      date,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save reminder
    reminders.push(reminder);

    res.json({
      success: true,
      message: 'Reminder created successfully',
      data: reminder
    });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create reminder'
    });
  }
});

// Get all reminders
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: reminders
    });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reminders'
    });
  }
});

// Update reminder status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reminder = reminders.find(r => r.id === id);
    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found'
      });
    }

    reminder.status = status;
    reminder.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Reminder updated successfully',
      data: reminder
    });
  } catch (error) {
    console.error('Error updating reminder:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update reminder'
    });
  }
});

// Delete reminder
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const index = reminders.findIndex(r => r.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found'
      });
    }

    reminders.splice(index, 1);

    res.json({
      success: true,
      message: 'Reminder deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete reminder'
    });
  }
});

export default router; 