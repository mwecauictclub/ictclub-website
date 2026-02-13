"""API routes blueprint."""

from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)


@api_bp.route('/health')
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'ok',
        'message': 'API is running'
    })


@api_bp.route('/events')
def get_events():
    """Get all events."""
    # TODO: Implement events retrieval from database
    return jsonify({
        'events': []
    })


@api_bp.route('/members')
def get_members():
    """Get all members."""
    # TODO: Implement members retrieval from database
    return jsonify({
        'members': []
    })
