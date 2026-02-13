"""API routes for ICT Club website."""

from flask import Blueprint, jsonify, request
from models.database import db, Member, Event
from utils.validators import validate_reg_number
from utils.helpers import format_error_response, format_success_response

api_bp = Blueprint('api', __name__)


@api_bp.route('/health')
def health():
    """Health check."""
    return jsonify({'status': 'ok', 'message': 'API is running'})


@api_bp.route('/check-member', methods=['POST'])
def check_member():
    """Check if member exists."""
    try:
        data = request.get_json()
        
        if not data or 'reg_number' not in data:
            return jsonify(format_error_response(
                'INVALID_REQUEST',
                'Registration number is required'
            )), 400
        
        reg_number = data['reg_number'].strip()
        
        # Validate format
        is_valid, error, normalized_reg = validate_reg_number(reg_number)
        if not is_valid:
            return jsonify(format_error_response(
                'INVALID_REG_NUMBER',
                error
            )), 400
        
        # Check if exists
        member = Member.query.filter_by(reg_number=normalized_reg).first()
        
        if member:
            return jsonify(format_success_response(
                data={
                    'exists': True,
                    'member': member.to_dict()
                }
            )), 200
        else:
            return jsonify(format_success_response(
                data={'exists': False},
                message='Member not found'
            )), 200
        
    except Exception as e:
        return jsonify(format_error_response(
            'UNKNOWN_ERROR',
            'An unexpected error occurred',
            str(e)
        )), 500


@api_bp.route('/register', methods=['POST'])
def register():
    """Register new member."""
    try:
        data = request.get_json()
        
        # Validate required fields
        required = ['reg_number', 'full_name', 'email', 'phone', 'gender', 
                   'year_of_study', 'course', 'departments']
        
        for field in required:
            if field not in data:
                return jsonify(format_error_response(
                    'INVALID_REQUEST',
                    f'{field} is required'
                )), 400
        
        # Validate reg number format
        is_valid, error, normalized_reg = validate_reg_number(data['reg_number'])
        if not is_valid:
            return jsonify(format_error_response(
                'INVALID_REG_NUMBER',
                error
            )), 400
        
        # Check if already exists
        existing = Member.query.filter_by(reg_number=normalized_reg).first()
        if existing:
            return jsonify(format_error_response(
                'DUPLICATE_MEMBER',
                'Member already registered'
            )), 409
        
        # Create member
        member = Member(
            reg_number=normalized_reg,
            full_name=data['full_name'].strip(),
            email=data['email'].strip().lower(),
            phone=data['phone'].strip(),
            gender=data['gender'],
            year_of_study=int(data['year_of_study']),
            course=data['course'].strip(),
            departments=','.join(data['departments']) if isinstance(data['departments'], list) else data['departments']
        )
        
        db.session.add(member)
        db.session.commit()
        
        return jsonify(format_success_response(
            data=member.to_dict(),
            message='Registration successful!'
        )), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify(format_error_response(
            'DATABASE_ERROR',
            'Registration failed',
            str(e)
        )), 500


@api_bp.route('/members')
def get_members():
    """Get all active members."""
    try:
        members = Member.query.filter_by(active=True).all()
        return jsonify(format_success_response(
            data=[m.to_dict() for m in members]
        ))
    except Exception as e:
        return jsonify(format_error_response(
            'DATABASE_ERROR',
            'Failed to fetch members',
            str(e)
        )), 500


@api_bp.route('/events')
def get_events():
    """Get all events."""
    try:
        status = request.args.get('status')
        query = Event.query
        
        if status:
            query = query.filter_by(status=status)
        
        events = query.order_by(Event.event_date.desc()).all()
        return jsonify(format_success_response(
            data=[e.to_dict() for e in events]
        ))
    except Exception as e:
        return jsonify(format_error_response(
            'DATABASE_ERROR',
            'Failed to fetch events',
            str(e)
        )), 500
