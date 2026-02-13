"""Database connection and utilities."""

import pymysql
from config.settings import MYSQL_CONFIG


def get_db_connection():
    """Get MySQL database connection."""
    try:
        connection = pymysql.connect(
            host=MYSQL_CONFIG['host'],
            user=MYSQL_CONFIG['user'],
            password=MYSQL_CONFIG['password'],
            database=MYSQL_CONFIG['database'],
            port=MYSQL_CONFIG['port'],
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except Exception as e:
        print(f"Database connection error: {e}")
        return None


def close_db_connection(connection):
    """Close database connection."""
    if connection:
        connection.close()
