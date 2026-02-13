#!/usr/bin/env python3
"""Import members from CSV file."""

import sys
import os
import csv
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

from app import app
from models.database import db, Member


def import_members():
    """Import members from CSV."""
    csv_file = '.idea/MWECAU ICT Club Attendance - Members.csv'
    
    if not os.path.exists(csv_file):
        print(f"❌ CSV file not found: {csv_file}")
        return
    
    with app.app_context():
        imported = 0
        skipped = 0
        
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            for row in reader:
                try:
                    # Check if already exists (by reg_number or email)
                    existing = Member.query.filter(
                        (Member.reg_number == row['Reg Number']) | 
                        (Member.email == row['Email'].strip().lower())
                    ).first()
                    
                    if existing:
                        skipped += 1
                        continue
                    
                    # Parse registration date
                    reg_date = None
                    if row.get('Registrations Date'):
                        try:
                            reg_date = datetime.strptime(row['Registrations Date'], '%Y-%m-%d')
                        except:
                            reg_date = datetime.utcnow()
                    
                    # Create member
                    member = Member(
                        reg_number=row['Reg Number'].strip(),
                        full_name=row['Full Name'].strip(),
                        email=row['Email'].strip().lower(),
                        phone=row['Phone'].strip(),
                        gender=row['Gender'].strip(),
                        year_of_study=int(row['Year of Study']),
                        course=row[' Course'].strip(),
                        departments=row['Departments'].strip(),
                        active=row['Active'].upper() == 'TRUE',
                        role=row['Role'].strip(),
                        registration_date=reg_date or datetime.utcnow()
                    )
                    
                    db.session.add(member)
                    db.session.flush()  # Flush to catch errors before commit
                    imported += 1
                    
                except Exception as e:
                    db.session.rollback()
                    print(f"⚠️  Error importing {row.get('Full Name', 'Unknown')}: {str(e)[:100]}")
                    continue
        
        db.session.commit()
        
        print(f"\n✅ Import completed!")
        print(f"   Imported: {imported} members")
        print(f"   Skipped: {skipped} (already exist)")


if __name__ == '__main__':
    import_members()
