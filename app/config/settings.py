"""Configuration settings for the application."""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Flask Configuration
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'

# MySQL Database Configuration
MYSQL_CONFIG = {
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', ''),
    'database': os.getenv('MYSQL_DATABASE', 'ictclub_db'),
    'port': int(os.getenv('MYSQL_PORT', 3306))
}

# Admin Configuration
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

# Application Settings
APP_NAME = 'MWECAU ICT Club'
APP_VERSION = '1.0.0'
