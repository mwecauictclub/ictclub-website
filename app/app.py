"""Main Flask application for MWECAU ICT Club Website."""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from models.database import db
from config.settings import Config

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
CORS(app)

# Import blueprints after app creation to avoid circular imports
from admin import admin_bp
from api import api_bp

# Register blueprints
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(api_bp, url_prefix='/api')


# Public routes - redirect to admin
@app.route('/')
def index():
    """Homepage."""
    return render_template('public/index.html')


@app.route('/register')
def register():
    """Registration page."""
    return render_template('public/register.html')


@app.route('/attendance')
def attendance():
    """Attendance page."""
    return render_template('public/attendance.html')


# Error handlers
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({'error': 'Not found', 'message': str(error)}), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors."""
    return jsonify({'error': 'Server error', 'message': str(error)}), 500


# Database initialization
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=app.config['DEBUG'])
