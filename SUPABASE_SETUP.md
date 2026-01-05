# Supabase Integration Guide (Recommended)

## Why Supabase?

Supabase is the **most compatible** database solution for your Quasar/Vue.js app because:

1. ✅ **PostgreSQL-based** - Full SQL database power
2. ✅ **Auto-generated REST APIs** - No backend code needed
3. ✅ **TypeScript support** - Perfect for your Vue 3 + TypeScript setup
4. ✅ **Real-time subscriptions** - Live data updates
5. ✅ **Built-in authentication** - User management included
6. ✅ **Free tier** - Generous free plan
7. ✅ **Easy integration** - Simple client library

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up (free)
3. Create a new project
4. Wait for database to initialize (~2 minutes)

### Step 2: Create Database Table

In Supabase Dashboard → SQL Editor, run:

```sql
-- Create registrations table
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

-- Enable Row Level Security (optional, for security)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (adjust as needed)
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reads (adjust as needed)
CREATE POLICY "Allow public reads" ON registrations
  FOR SELECT
  TO anon
  USING (true);
```

### Step 3: Get Your API Keys

1. Go to Project Settings → API
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (for client-side)

### Step 4: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 5: Configure Supabase Client

See the code files created for integration.

## Alternative: Firebase/Firestore

If you prefer NoSQL:
- ✅ Very easy integration
- ✅ Real-time by default
- ✅ Built-in auth
- ❌ NoSQL (less structured)
- ❌ Vendor lock-in

## Alternative: Traditional PostgreSQL + Backend

If you need full control:
- ✅ Complete control
- ✅ Custom business logic
- ❌ More setup required
- ❌ Need to write backend code

## Recommendation

**Use Supabase** - It's PostgreSQL (which you asked about) with the easiest integration for Vue/Quasar apps.



VITE_SUPABASE_URL=https://wcvgynhuhspnvxivksyj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjdmd5bmh1aHNwbnZ4aXZrc3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1OTg0NjMsImV4cCI6MjA4MzE3NDQ2M30.KhCJazcTc3sZsKNdQ0ahriC9xjuCv5mjfAZBmmCxBY0