"""Admin panel routes."""

from flask import Blueprint, render_template, redirect, url_for, session, request, flash
from functools import wraps
from config.settings import ADMIN_USERNAME, ADMIN_PASSWORD

admin_bp = Blueprint('admin', __name__)


def login_required(f):
    """Decorator to require login for admin routes."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_logged_in' not in session:
            return redirect(url_for('admin.login'))
        return f(*args, **kwargs)
    return decorated_function


@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Admin login page."""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['admin_logged_in'] = True
            flash('Login successful!', 'success')
            return redirect(url_for('admin.dashboard'))
        else:
            flash('Invalid credentials', 'danger')
    
    return render_template('admin/login.html')


@admin_bp.route('/logout')
def logout():
    """Admin logout."""
    session.pop('admin_logged_in', None)
    flash('Logged out successfully', 'info')
    return redirect(url_for('admin.login'))


@admin_bp.route('/dashboard')
@login_required
def dashboard():
    """Admin dashboard."""
    return render_template('admin/dashboard.html')


@admin_bp.route('/events')
@login_required
def manage_events():
    """Manage events."""
    return render_template('admin/events.html')


@admin_bp.route('/members')
@login_required
def manage_members():
    """Manage members."""
    return render_template('admin/members.html')
