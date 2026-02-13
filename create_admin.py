#!/usr/bin/env python3
"""Create default admin user for MWECAU ICT Club."""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

from app import app
from models.database import db, User

def create_admin():
    """Create default admin user."""
    with app.app_context():
        # Check if admin already exists
        existing = User.query.filter_by(username='admin').first()
        if existing:
            print("✓ Admin user already exists")
            print(f"  Username: admin")
            return
        
        # Create admin user
        admin = User(
            username='admin',
            full_name='System Administrator',
            role='admin',
            active=True
        )
        admin.set_password('admin123')  # Change this password after first login!
        
        db.session.add(admin)
        db.session.commit()
        
        print("✅ Admin user created successfully!")
        print(f"  Username: admin")
        print(f"  Password: admin123")
        print("\n⚠️  IMPORTANT: Change the password after first login!")

if __name__ == '__main__':
    create_admin()
