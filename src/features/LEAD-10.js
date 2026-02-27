sql
-- Migration: 001_create_users_table.sql
-- Created at: 2024-01-01T00:00:00Z
-- Description: Create users table with email uniqueness constraint

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

python
# migrations/001_create_users_table.py
# Alembic migration file for SQLAlchemy

"""Create users table with email uniqueness constraint

Revision ID: 001
Revises: 
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Create users table with all required fields and constraints."""
    op.create_table(
        'users',
        sa.Column(
            'id',
            postgresql.UUID(as_uuid=True),
            server_default=sa.text('gen_random_uuid()'),
            nullable=False
        ),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('password_hash', sa.String(255), nullable=False),
        sa.Column('first_name', sa.String(100), nullable=False),
        sa.Column('last_name', sa.String(100), nullable=False),
        sa.Column(
            'created_at',
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False
        ),
        sa.Column(
            'updated_at',
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False
        ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email', name='uq_users_email')
    )
    
    # Create indexes
    op.create_index('idx_users_email', 'users', ['email'], unique=False)
    op.create_index('idx_users_created_at', 'users', ['created_at'], unique=False)


def downgrade() -> None:
    """Drop users table and all associated indexes."""
    op.drop_index('idx_users_created_at', table_name='users')
    op.drop_index('idx_users_email', table_name='users')
    op.drop_table('users')

python
# models/user.py
# SQLAlchemy ORM model

from datetime import datetime
from typing import Optional
import uuid
from sqlalchemy import Column, String, DateTime, Index, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    """User model representing a user in the database.
    
    Attributes:
        id: Unique identifier (UUID)
        email: User's email address (unique, indexed)
        password_hash: Bcrypt hash of user's password
        first_name: User's first name
        last_name: User's last name
        created_at: Timestamp when user was created
        updated_at: Timestamp when user was last updated
    """
    
    __tablename__ = 'users'
    __table_args__ = (
        UniqueConstraint('email', name='uq_users_email'),
        Index('idx_users_email', 'email'),
        Index('idx_users_created_at', 'created_at'),
    )
    
    id: Column = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )
    email: Column = Column(
        String(255),
        nullable=False,
        unique=True
    )
    password_hash: Column = Column(
        String(255),
        nullable=False
    )
    first_name: Column = Column(
        String(100),
        nullable=False
    )
    last_name: Column = Column(
        String(100),
        nullable=False
    )
    created_at: Column = Column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False
    )
    updated_at: Column = Column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email})>"
    
    def to_dict(self, include_password: bool = False) -> dict:
        """Convert user object to dictionary.
        
        Args:
            include_password: Whether to include password_hash in output
            
        Returns:
            Dictionary representation of user
        """
        data = {
            'id': str(self.id),
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
        if include_password:
            data['password_hash'] = self.password_hash
        return data

python
# tests/test_user_schema.py
# Unit tests for user schema

import pytest
from datetime import datetime
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import sessionmaker, Session
from models.user import Base, User
import uuid


@pytest.fixture
def db_session() -> Session:
    """Create an in-memory SQLite database for testing."""
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    yield session
    session.close()


class TestUserSchema:
    """Test cases for user schema."""
    
    def test_users_table_exists(self, db_session: Session):
        """Test that users table exists with all required columns."""
        inspector = db_session.connection().inspector
        table_names = inspector.get_table_names()
        assert 'users' in table_names
        
        columns = {col['name']: col for col in inspector.get_columns('users')}
        required_fields = ['id', 'email', 'password_hash', 'first_name', 'last_name', 'created_at', 'updated_at']
        
        for field in required_fields:
            assert field in columns, f"Column {field} not found in users table"
    
    def test_insert_valid_user(self, db_session: Session):
        """Test inserting a valid user."""
        user = User(
            email='test@example.com',
            password_hash='$2b$12$hashed_password_here',
            first_name='John',
            last_name='Doe'
        )
        db_session.add(user)
        db_session.commit()
        
        retrieved_user = db_session.query(User).filter_by(email='test@example.com').first()
        assert retrieved_user is not None
        assert retrieved_user.first_name == 'John'
        assert retrieved_user.last_name == 'Doe'
    
    def test_email_uniqueness_constraint(self, db_session: Session):
        """Test that duplicate emails are rejected."""
        user1 = User(
            email='duplicate@example.com',
            password_hash='$2b$12$hash1',
            first_name='John',
            last_name='Doe'
        )
        user2 = User(
            email='duplicate@example.com',
            password_hash='$2b$12$hash2',
            first_name='Jane',
            last_name='Doe'
        )
        
        db_session.add(user1)
        db_session.commit()
        
        db_session.add(user2)
        with pytest.raises(exc.IntegrityError):
            db_session.commit()
    
    def test_password_stored_as_hash(self, db_session: Session):
        """Test that password is stored as hash, not plain text."""
        plain_password = 'MySecurePassword123!'
        hashed_password = '$2b$12$abcdefghijklmnopqrst.uvwxyz123456789'
        
        user = User(
            email='test@example.com',
            password_hash=hashed_password,
            first_name='John',
            last_name='Doe'
        )
        db_session.add(user)
        db_session.commit()
        
        retrieved_user = db_session.query(User).filter_by(email='test@example.com').first()
        assert retrieved_user.password_hash == hashed_password
        assert retrieved_user.password_hash != plain_password
    
    def test_timestamps_auto_set(self, db_session: Session):
        """Test that created_at and updated_at are automatically set."""
        before_insert = datetime.utcnow()
        
        user = User(
            email='test@example.com',
            password_hash='$2b$12$hash',
            first_name='John',
            last_name='Doe'
        )
        db_session.add(user)
        db_session.commit()
        
        after_insert = datetime.utcnow()
        
        assert user.created_at is not None
        assert user.updated_at is not None
        assert before_insert <= user.created_at <= after_insert
    
    def test_email_index_exists(self, db_session: Session):
        """Test that email index exists for faster lookups."""
        inspector = db_session.connection().inspector
        indexes = inspector.get_indexes('users')
        index_names = [idx['name'] for idx in indexes]
        
        assert 'idx_users_email' in index_names
    
    def test_user_to_dict_without_password(self, db_session: Session):
        """Test converting user to dict without password hash."""
        user = User(
            email='test@example.com',
            password_hash='$2b$12$hash',
            first_name='John',
            last_name='Doe'
        )
        db_session.add(user)
        db_session.commit()
        
        user_dict = user.to_dict(include_password=False)
        assert 'password_hash' not in user_dict
        assert user_dict['email'] == 'test@example.com'
        assert user_dict['first_name'] == 'John'
    
    def test_user_to_dict_with_password(self, db_session: Session):
        """Test converting user to dict with password hash."""
        user = User(
            email='test@example.com',
            password_hash='$2b$12$hash',
            first_name='John',
            last_name='Doe'
        )
        db_session.add(user)
        db_session.commit()
        
        user_dict = user.to_dict(include_password=True)
        assert 'password_hash' in user_dict
        assert user_dict['password_hash'] == '$2b$12$hash'

python
# database.py
# Database configuration and utilities

from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
import os
from typing import Generator

# Database connection string
DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://user:password@localhost:5432/users_db'
)

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    echo=os.getenv('SQL_ECHO', 'False').lower() == 'true',
    pool_pre_ping=True,  # Test connections before using them
    pool_recycle=3600,   # Recycle connections after 1 hour
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """Dependency for getting database session.
    
    Yields:
        SQLAlchemy Session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """Initialize database by creating all tables."""
    from models.user import Base
    Base.metadata.create_all(bind=engine)


# Enable foreign key constraints for SQLite (if using SQLite)
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_conn, connection_record):
    """Set SQLite pragmas for better constraints."""
    if 'sqlite' in str(engine.url):
        cursor = dbapi_conn.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

makefile
# Makefile
# Common database operations

.PHONY: db-init db-migrate db-upgrade db-downgrade db-fresh db-seed test clean

# Initialize database
db-init:
	python -c "from database import init_db; init_db()"
	@echo "Database initialized successfully"

# Run migrations
db-migrate:
	alembic revision --autogenerate -m "$(message)"

# Upgrade to latest migration
db-upgrade:
	alembic upgrade head

# Downgrade one migration
db-downgrade:
	alembic downgrade -1

# Fresh database (drop and recreate)
db-fresh: clean db-init
	@echo "Database reset successfully"

# Run tests
test:
	pytest tests/test_user_schema.py -v

# Clean database
clean:
	find . -name "*.db" -delete
	find . -name "__pycache__" -type d -delete

.DEFAULT_GOAL := help
help:
	@echo "Available database commands:"
	@grep -E "^[a-z-]+:" Makefile | sed 's/:.*//g' | column