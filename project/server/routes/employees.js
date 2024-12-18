import express from 'express';
import { employees } from '../data/employees.js';
import { mockClients } from '../data/mockClients.js';

const router = express.Router();

// Get special days (birthdays and anniversaries)
router.get('/events/special-days', (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    const specialDays = mockClients.reduce((acc, client) => {
      const events = [];
      
      // Check birthday
      if (client.dateOfBirth) {
        const birthday = new Date(client.dateOfBirth);
        const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
        
        if (nextBirthday < today) {
          nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        if (nextBirthday <= thirtyDaysFromNow) {
          events.push({
            clientId: client.id,
            clientName: client.name,
            eventType: 'birthday',
            date: nextBirthday.toISOString(),
            isRural: client.area === 'rural'
          });
        }
      }
      
      // Check account anniversary
      if (client.accountOpenDate) {
        const anniversary = new Date(client.accountOpenDate);
        const nextAnniversary = new Date(today.getFullYear(), anniversary.getMonth(), anniversary.getDate());
        
        if (nextAnniversary < today) {
          nextAnniversary.setFullYear(today.getFullYear() + 1);
        }
        
        if (nextAnniversary <= thirtyDaysFromNow) {
          events.push({
            clientId: client.id,
            clientName: client.name,
            eventType: 'anniversary',
            date: nextAnniversary.toISOString(),
            isRural: client.area === 'rural'
          });
        }
      }
      
      return [...acc, ...events];
    }, []);
    
    res.json({
      specialDays: specialDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    });
  } catch (error) {
    console.error('Special days error:', error);
    res.status(500).json({ error: 'Failed to fetch special days' });
  }
});

// Get all employees
router.get('/', (req, res) => {
  try {
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Get employee by ID
router.get('/:id', (req, res) => {
  try {
    const employee = employees.find(e => e.id === req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

// Add new employee
router.post('/', (req, res) => {
  try {
    const { name, role, email, phone, payroll } = req.body;
    
    const newEmployee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name,
      role,
      email,
      phone,
      expertise: req.body.expertise || [],
      languages: req.body.languages || ['English'],
      metrics: {
        activeDeals: 0,
        closedDeals: 0,
        successRate: 0,
        customerRating: 0,
        revenueGenerated: 0,
        performanceScore: 0
      },
      attendance: {
        present: 0,
        absent: 0,
        leaves: 0,
        totalDays: 0
      },
      payroll: {
        basicSalary: payroll?.basicSalary || 0,
        allowances: payroll?.allowances || 0,
        deductions: payroll?.deductions || 0,
        netSalary: (payroll?.basicSalary || 0) + (payroll?.allowances || 0) - (payroll?.deductions || 0)
      },
      performanceHighlights: [],
      availability: {
        status: 'available',
        nextAvailable: null
      },
      currentDeals: []
    };
    
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Update employee
router.put('/:id', (req, res) => {
  try {
    const index = employees.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Delete employee
router.delete('/:id', (req, res) => {
  try {
    const index = employees.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const deletedEmployee = employees.splice(index, 1)[0];
    res.json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

// Update employee attendance
router.post('/:id/attendance', (req, res) => {
  try {
    const employee = employees.find(e => e.id === req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    employee.attendance = {
      ...employee.attendance,
      ...req.body,
      totalDays: employee.attendance.totalDays + 1
    };
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

// Update employee payroll
router.put('/:id/payroll', (req, res) => {
  try {
    const employee = employees.find(e => e.id === req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    employee.payroll = {
      ...employee.payroll,
      ...req.body,
      netSalary: req.body.basicSalary + req.body.allowances - req.body.deductions
    };
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payroll' });
  }
});

export default router;
