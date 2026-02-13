"""GPS validation utilities for attendance tracking."""

from math import radians, sin, cos, sqrt, atan2


# MWECAU Campus Location
MWECAU_LATITUDE = -3.294995
MWECAU_LONGITUDE = 37.3292853
ALLOWED_RADIUS_METERS = 100


def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance between two points on earth.
    
    Args:
        lat1, lon1: First point coordinates
        lat2, lon2: Second point coordinates
    
    Returns:
        Distance in meters
    """
    # Earth's radius in meters
    R = 6371000
    
    # Convert to radians
    lat1_rad = radians(lat1)
    lat2_rad = radians(lat2)
    delta_lat = radians(lat2 - lat1)
    delta_lon = radians(lon2 - lon1)
    
    # Haversine formula
    a = sin(delta_lat / 2) ** 2 + cos(lat1_rad) * cos(lat2_rad) * sin(delta_lon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    
    distance = R * c
    return distance


def validate_location(latitude, longitude):
    """
    Validate if user is within allowed radius of MWECAU campus.
    
    Args:
        latitude: User's latitude
        longitude: User's longitude
    
    Returns:
        tuple: (is_valid, message, distance)
    """
    try:
        # Validate coordinate format
        if not isinstance(latitude, (int, float)) or not isinstance(longitude, (int, float)):
            return False, "Invalid GPS coordinates format", None
        
        # Validate coordinate ranges
        if not (-90 <= latitude <= 90):
            return False, "Invalid latitude value", None
        
        if not (-180 <= longitude <= 180):
            return False, "Invalid longitude value", None
        
        # Calculate distance from MWECAU
        distance = haversine_distance(latitude, longitude, MWECAU_LATITUDE, MWECAU_LONGITUDE)
        
        # Check if within allowed radius
        if distance <= ALLOWED_RADIUS_METERS:
            return True, f"Location verified ({distance:.0f}m from campus)", distance
        else:
            return False, f"You must be on campus to mark attendance (You are {distance:.0f}m away)", distance
    
    except Exception as e:
        return False, f"Location validation error: {str(e)}", None


def format_coordinates(latitude, longitude):
    """Format coordinates for display."""
    lat_dir = "N" if latitude >= 0 else "S"
    lon_dir = "E" if longitude >= 0 else "W"
    return f"{abs(latitude):.6f}°{lat_dir}, {abs(longitude):.6f}°{lon_dir}"
