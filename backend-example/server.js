// Simple Node.js/Express backend example
// Install: npm install express pg cors dotenv
// Run: node server.js

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'prism_db',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Create registration
app.post('/api/registrations', async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, company, position } = req.body;
    
    // Validation
    if (!firstName || !lastName || !mobileNumber || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const result = await pool.query(
      `INSERT INTO registrations 
       (first_name, last_name, mobile_number, email, company, position, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
       RETURNING *`,
      [firstName, lastName, mobileNumber, email, company, position]
    );
    
    res.status(201).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error:', error);
    
    // Handle duplicate email error
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already registered' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Registration failed' 
    });
  }
});

// Get all registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM registrations ORDER BY created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch registrations' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API endpoint: http://localhost:${port}/api`);
});

