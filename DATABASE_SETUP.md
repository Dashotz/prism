# Database Integration Guide

## Architecture Overview

Your Quasar/Vue.js frontend **cannot directly connect to PostgreSQL**. You need a backend API server that:
1. Connects to PostgreSQL
2. Provides REST API endpoints
3. Handles authentication and security
4. Validates and sanitizes data

## Architecture Flow

```
Frontend (Vue/Quasar) 
    ↓ HTTP Requests (Axios)
Backend API (Node.js/Express, Python/Flask, etc.)
    ↓ Database Driver (pg, psycopg2, etc.)
PostgreSQL Database
```

## Option 1: Node.js/Express Backend (Recommended)

### Backend Setup

1. **Create a new backend directory** (outside your Quasar project):
```bash
mkdir prism-backend
cd prism-backend
npm init -y
npm install express pg cors dotenv
npm install -D @types/express @types/pg @types/cors typescript ts-node nodemon
```

2. **Create `server.ts`**:
```typescript
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

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

app.use(cors());
app.use(express.json());

// Registration endpoint
app.post('/api/registrations', async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, company, position } = req.body;
    
    const result = await pool.query(
      `INSERT INTO registrations 
       (first_name, last_name, mobile_number, email, company, position, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
       RETURNING *`,
      [firstName, lastName, mobileNumber, email, company, position]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Get all registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registrations ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch registrations' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

3. **Create `.env` file**:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=prism_db
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
```

4. **Create PostgreSQL database**:
```sql
CREATE DATABASE prism_db;

CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  mobile_number VARCHAR(11) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  company VARCHAR(255),
  position VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Option 2: Supabase (Easiest - PostgreSQL as a Service)

Supabase provides PostgreSQL with auto-generated REST APIs:

1. **Sign up at supabase.com**
2. **Create a new project**
3. **Create table in Supabase dashboard**:
```sql
CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  position TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

4. **Get your API URL and anon key from Supabase dashboard**

## Option 3: Python/Flask Backend

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'prism_db'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'password')
    )

@app.route('/api/registrations', methods=['POST'])
def create_registration():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        """INSERT INTO registrations 
           (first_name, last_name, mobile_number, email, company, position) 
           VALUES (%s, %s, %s, %s, %s, %s) 
           RETURNING *""",
        (data['firstName'], data['lastName'], data['mobileNumber'], 
         data['email'], data['company'], data['position'])
    )
    
    result = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({'success': True, 'data': dict(result)}), 201

if __name__ == '__main__':
    app.run(port=3000)
```

## Frontend Integration

Update your axios configuration and create API service files as shown in the code changes.

