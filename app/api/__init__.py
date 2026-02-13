"""API routes."""

from flask import Blueprint, jsonify, request
from models.database import db, Member, Event

api_bp = Blueprint('api', __name__)


@api_bp.route('/health')
def health():
    """Health check."""
    return jsonify({'status': 'ok', 'message': 'API is running'})


@api_bp.route('/members')
def get_members():
    """Get all active members."""
    members = Member.query.filter_by(active=True).all()
    return jsonify({'members': [m.to_dict() for m in members]})


@api_bp.route('/members/<int:member_id>')
def get_member(member_id):
    """Get specific member."""
    member = Member.query.get_or_404(member_id)
    return jsonify(member.to_dict())


@api_bp.route('/events')
def get_events():
    """Get all events."""
    status = request.args.get('status')
    query = Event.query
    
    if status:
        query = query.filter_by(status=status)
    
    events = query.order_by(Event.event_date.desc()).all()
    return jsonify({'events': [e.to_dict() for e in events]})


@api_bp.route('/events/<int:event_id>')
def get_event(event_id):
    """Get specific event."""
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())


@api_bp.route('/stats')
def get_stats():
    """Get website statistics."""
    stats = {
        'total_members': Member.query.count(),
        'active_members': Member.query.filter_by(active=True).count(),
        'total_events': Event.query.count(),
        'upcoming_events': Event.query.filter_by(status='upcoming').count()
    }
    return jsonify(stats)


@api_bp.errorhandler(404)
def not_found(error):
    """Handle 404 for API."""
    return jsonify({'error': 'Resource not found'}), 404


@api_bp.errorhandler(500)
def server_error(error):
    """Handle 500 for API."""
    return jsonify({'error': 'Internal server error'}), 500
