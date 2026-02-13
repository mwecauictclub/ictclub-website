"""Main Flask application for MWECAU ICT Club Website."""

import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, render_template
from flask_cors import CORS
from config.settings import SECRET_KEY, DEBUG, MYSQL_CONFIG
from api import api_bp
from admin import admin_bp

# Create Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = SECRET_KEY
app.config['DEBUG'] = DEBUG
app.config['JSON_SORT_KEYS'] = False

# MySQL Configuration
app.config['MYSQL_HOST'] = MYSQL_CONFIG['host']
app.config['MYSQL_USER'] = MYSQL_CONFIG['user']
app.config['MYSQL_PASSWORD'] = MYSQL_CONFIG['password']
app.config['MYSQL_DB'] = MYSQL_CONFIG['database']

# Enable CORS
CORS(app)

# Register blueprints
app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(admin_bp, url_prefix='/admin')


# Public routes
@app.route('/')
def index():
    """Homepage."""
    return render_template('public/index.html')


@app.route('/about')
def about():
    """About page."""
    return render_template('public/about.html')


@app.route('/events')
def events():
    """Events page."""
    return render_template('public/events.html')


@app.route('/members')
def members():
    """Members page."""
    return render_template('public/members.html')


@app.route('/contact')
def contact():
    """Contact page."""
    return render_template('public/contact.html')


# Error handlers
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return render_template('public/404.html'), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors."""
    return render_template('public/500.html'), 500


if __name__ == '__main__':
    # Run the application
    app.run(host='0.0.0.0', port=5000, debug=DEBUG)
