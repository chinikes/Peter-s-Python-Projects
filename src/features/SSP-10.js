
```python
#!/usr/bin/env python3
"""
Production-ready Simple Login Page using Claude API with tool use.
Demonstrates a login system with user validation and session management.
"""

import anthropic
import json
import secrets
import hashlib
from datetime import datetime, timedelta


VALID_USERS = {
    "admin": hashlib.sha256("admin123".encode()).hexdigest(),
    "user": hashlib.sha256("password".encode()).hexdigest(),
    "demo": hashlib.sha256("demo".encode()).hexdigest(),
}

ACTIVE_SESSIONS = {}


def hash_password(password: str) -> str:
    """Hash a password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()


def validate_user_credentials(username: str, password: str) -> dict:
    """Validate user credentials against the user database."""
    if username not in VALID_USERS:
        return {"success": False, "error": "User not found"}
    
    password_hash = hash_password(password)
    if VALID_USERS[username] != password_hash:
        return {"success": False, "error": "Invalid password"}
    
    return {"success": True, "message": f"User {username} authenticated successfully"}


def create_session(username: str) -> dict:
    """Create a new user session."""
    session_id = secrets.token_urlsafe(32)
    session_token = secrets.token_urlsafe(32)
    
    expiry = datetime.now() + timedelta(hours=24)
    
    ACTIVE_SESSIONS[session_id] = {
        "username": username,
        "token": session_token,
        "created": datetime.now().isoformat(),
        "expiry": expiry.isoformat(),
        "ip": "127.0.0.1",
        "user_agent": "Login System",
    }
    
    return {
        "session_id": session_id,
        "token": session_token,
        "expires_at": expiry.isoformat(),
        "message": f"Session created for user {username}",
    }


def verify_session(session_id: str, token: str) -> dict:
    """Verify if a session is valid."""
    if session_id not in ACTIVE_SESSIONS:
        return {"valid": False, "error": "Session not found"}
    
    session = ACTIVE_SESSIONS[session_id]
    
    if session["token"] != token:
        return {"valid": False, "error": "Invalid token"}
    
    if datetime.fromisoformat(session["expiry"]) < datetime.now():
        del ACTIVE_SESSIONS[session_id]
        return {"valid": False, "error": "Session expired"}
    
    return {
        "valid": True,
        "username": session["username"],
        "created_at": session["created"],
        "expires_at": session["expiry"],
    }


def logout_session(session_id: str) -> dict:
    """Logout and invalidate a session."""
    if session_id in ACTIVE_SESSIONS:
        username = ACTIVE_SESSIONS[session_id]["username"]
        del ACTIVE_SESSIONS[session_id]
        return {"success": True, "message": f"User {username} logged out successfully"}
    
    return {"success": False, "error": "Session not found"}


def process_tool_call(tool_name: str, tool_input: dict) -> str:
    """Process tool calls from Claude."""
    if tool_name == "validate_credentials":
        result = validate_user_credentials(
            tool_input.get("username", ""),
            tool_input.get("password", "")
        )
        return json.dumps(result)
    
    elif tool_name == "create_session":
        result = create_session(tool_input.get("username", ""))
        return json.dumps(result)
    
    elif tool_name == "verify_session":
        result = verify_session(
            tool_input.get("session_id", ""),
            tool_input.get("token", "")
        )
        return json.dumps(