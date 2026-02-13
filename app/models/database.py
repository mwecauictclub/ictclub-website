"""Database models for MWECAU ICT Club Website."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Member(db.Model):
    """Club member model."""
    __tablename__ = 'members'
    
    id = db.Column(db.Integer, primary_key=True)
    reg_number = db.Column(db.String(50), unique=True, nullable=False, index=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(20), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    year_of_study = db.Column(db.Integer, nullable=False)
    course = db.Column(db.String(50), nullable=False)
    departments = db.Column(db.Text, nullable=False)
    active = db.Column(db.Boolean, default=True)
    role = db.Column(db.String(20), default='Member')
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    events = db.relationship('Event', secondary='event_participants', back_populates='participants')
    
    def to_dict(self):
        return {
            'id': self.id,
            'reg_number': self.reg_number,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'gender': self.gender,
            'year_of_study': self.year_of_study,
            'course': self.course,
            'departments': self.departments,
            'active': self.active,
            'role': self.role
        }


class Event(db.Model):
    """Club events model."""
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    event_date = db.Column(db.Date, nullable=False)
    event_time = db.Column(db.String(50), nullable=True)
    location = db.Column(db.String(200), nullable=True)
    event_type = db.Column(db.String(50), nullable=False)  # Workshop, Meeting, Hackathon, etc.
    status = db.Column(db.String(20), default='upcoming')  # upcoming, ongoing, completed
    image_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    participants = db.relationship('Member', secondary='event_participants', back_populates='events')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'event_date': self.event_date.isoformat() if self.event_date else None,
            'event_time': self.event_time,
            'location': self.location,
            'event_type': self.event_type,
            'status': self.status,
            'image_url': self.image_url,
            'participants_count': len(self.participants)
        }


class EventParticipant(db.Model):
    """Event participants junction table."""
    __tablename__ = 'event_participants'
    
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'), nullable=False)
    registered_at = db.Column(db.DateTime, default=datetime.utcnow)


class Content(db.Model):
    """Website content model."""
    __tablename__ = 'content'
    
    id = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String(50), nullable=False, index=True)  # hero, about, mission, etc.
    key = db.Column(db.String(100), nullable=False)
    value = db.Column(db.Text, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'section': self.section,
            'key': self.key,
            'value': self.value
        }


class User(db.Model):
    """Admin users model."""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), default='admin')
    active = db.Column(db.Boolean, default=True)
    last_login = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'full_name': self.full_name,
            'role': self.role,
            'active': self.active
        }
