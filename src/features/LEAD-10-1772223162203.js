sql
-- Migration: 001_create_users_table.sql
-- Description: Create users table with proper constraints and indexes
-- Created at: 2024-01-15

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT email_not_empty CHECK (email != ''),
    CONSTRAINT password_hash_not_empty CHECK (password_hash != ''),
    CONSTRAINT first_name_not_empty CHECK (first_name != ''),
    CONSTRAINT last_name_not_empty CHECK (last_name != '')
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index on created_at for sorting/filtering
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_users_updated_at();

-- Schema Documentation
/*
SCHEMA: users

Purpose: Stores user account information and authentication credentials

Fields:
  - id (UUID): Primary key, automatically generated unique identifier
  - email (VARCHAR 255): User's email address, must be unique and non-empty
  - password_hash (VARCHAR 255): Bcrypt/Argon2 hashed password, never plain text
  - first_name (VARCHAR 100): User's first name, non-empty
  - last_name (VARCHAR 100): User's last name, non-empty
  - created_at (TIMESTAMP TZ): Record creation timestamp, auto-set
  - updated_at (TIMESTAMP TZ): Record last update timestamp, auto-updated

Constraints:
  - UNIQUE: email (enforced at database level)
  - NOT NULL: all fields except none
  - CHECK: non-empty email, password_hash, first_name, last_name

Indexes:
  - idx_users_email: ON (email) for fast email lookups and uniqueness enforcement
  - idx_users_created_at: ON (created_at DESC) for chronological queries

Triggers:
  - trigger_users_updated_at: Automatically updates updated_at on any UPDATE

Notes:
  - Email should be normalized (lowercase) at application level before insertion
  - Password must be hashed using bcrypt/Argon2 before storing
  - UUID provides better distributed system compatibility than serial integers
*/