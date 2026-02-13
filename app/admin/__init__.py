"""Admin panel routes."""

from flask import Blueprint, render_template, redirect, url_for, session, request, flash, jsonify
from functools import wraps
from models.database import db, User, Member, Event
from datetime import datetime

admin_bp = Blueprint('admin', __name__)


def login_required(f):
    """Decorator for admin authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'admin_id' not in session:
            flash('Please login first', 'warning')
            return redirect(url_for('admin.login'))
        return f(*args, **kwargs)
    return decorated


@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Admin login."""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username, active=True).first()
        
        if user and user.check_password(password):
            session['admin_id'] = user.id
            session['admin_name'] = user.full_name
            user.last_login = datetime.utcnow()
            db.session.commit()
            flash('Login successful!', 'success')
            return redirect(url_for('admin.dashboard'))
        
        flash('Invalid credentials', 'danger')
    
    return render_template('admin/login.html')


@admin_bp.route('/logout')
def logout():
    """Admin logout."""
    session.clear()
    flash('Logged out successfully', 'info')
    return redirect(url_for('admin.login'))


@admin_bp.route('/dashboard')
@login_required
def dashboard():
    """Admin dashboard."""
    stats = {
        'total_members': Member.query.count(),
        'active_members': Member.query.filter_by(active=True).count(),
        'total_events': Event.query.count(),
        'upcoming_events': Event.query.filter_by(status='upcoming').count()
    }
    
    recent_members = Member.query.order_by(Member.registration_date.desc()).limit(5).all()
    upcoming_events = Event.query.filter_by(status='upcoming').order_by(Event.event_date).limit(5).all()
    
    return render_template('admin/dashboard.html', 
                         stats=stats, 
                         recent_members=recent_members,
                         upcoming_events=upcoming_events)


@admin_bp.route('/members')
@login_required
def manage_members():
    """Manage members."""
    members = Member.query.order_by(Member.registration_date.desc()).all()
    return render_template('admin/members.html', members=members)


@admin_bp.route('/members/add', methods=['POST'])
@login_required
def add_member():
    """Add new member."""
    try:
        member = Member(
            reg_number=request.form.get('reg_number'),
            full_name=request.form.get('full_name'),
            email=request.form.get('email'),
            phone=request.form.get('phone'),
            gender=request.form.get('gender'),
            year_of_study=int(request.form.get('year_of_study')),
            course=request.form.get('course'),
            departments=request.form.get('departments')
        )
        db.session.add(member)
        db.session.commit()
        flash('Member added successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error adding member: {str(e)}', 'danger')
    
    return redirect(url_for('admin.manage_members'))


@admin_bp.route('/events')
@login_required
def manage_events():
    """Manage events."""
    events = Event.query.order_by(Event.event_date.desc()).all()
    return render_template('admin/events.html', events=events)


@admin_bp.route('/events/add', methods=['POST'])
@login_required
def add_event():
    """Add new event."""
    try:
        event = Event(
            title=request.form.get('title'),
            description=request.form.get('description'),
            event_date=datetime.strptime(request.form.get('event_date'), '%Y-%m-%d').date(),
            event_time=request.form.get('event_time'),
            location=request.form.get('location'),
            event_type=request.form.get('event_type'),
            status=request.form.get('status', 'upcoming')
        )
        db.session.add(event)
        db.session.commit()
        flash('Event added successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error adding event: {str(e)}', 'danger')
    
    return redirect(url_for('admin.manage_events'))


@admin_bp.route('/content')
@login_required
def manage_content():
    """Manage website content."""
    return render_template('admin/content.html')
