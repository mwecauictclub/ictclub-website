# MWECAU ICT Club Website - Flask Backend

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Database
Edit `.env` file:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=ictclub_website_db
```

### 3. Create Database
```sql
CREATE DATABASE ictclub_website_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Run Application
```bash
cd app
python app.py
```

### 5. Access
- **Public Site**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin/login
- **API**: http://localhost:5000/api/health

## Default Admin
Create first admin user in MySQL:
```sql
USE ictclub_website_db;

INSERT INTO users (username, password_hash, full_name, role, active)
VALUES ('admin', 'scrypt:32768:8:1$...', 'Admin User', 'admin', 1);
```

Or use Python:
```python
from app import app, db
from models.database import User

with app.app_context():
    admin = User(username='admin', full_name='Admin User')
    admin.set_password('admin123')
    db.session.add(admin)
    db.session.commit()
```

## Structure
```
app/
├── admin/          # Admin panel
├── api/            # REST API
├── config/         # Configuration
├── models/         # Database models
├── services/       # Business logic
├── static/         # CSS, JS, images
├── templates/      # HTML templates
└── app.py         # Main application
```

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/members` - List members
- `GET /api/events` - List events
- `GET /api/stats` - Statistics

## Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard
- `/admin/members` - Manage members
- `/admin/events` - Manage events
- `/admin/content` - Manage content
