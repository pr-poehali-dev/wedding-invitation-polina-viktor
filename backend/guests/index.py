import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''API для работы с данными гостей свадьбы'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if method == 'POST':
            data = json.loads(event.get('body', '{}'))
            guest_name = data.get('guestName', '')
            food_preferences = data.get('foodPreferences', [])
            allergy_text = data.get('allergyText', '')
            drink_preferences = data.get('drinkPreferences', [])
            
            cur.execute(
                '''INSERT INTO wedding_guests 
                   (guest_name, food_preferences, allergy_text, drink_preferences) 
                   VALUES (%s, %s, %s, %s) RETURNING id''',
                (guest_name, food_preferences, allergy_text, drink_preferences)
            )
            guest_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'id': guest_id}),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            cur.execute(
                '''SELECT id, guest_name, food_preferences, allergy_text, 
                          drink_preferences, created_at 
                   FROM wedding_guests 
                   ORDER BY created_at DESC'''
            )
            rows = cur.fetchall()
            
            guests = []
            for row in rows:
                guests.append({
                    'id': row[0],
                    'guestName': row[1],
                    'foodPreferences': row[2] or [],
                    'allergyText': row[3] or '',
                    'drinkPreferences': row[4] or [],
                    'createdAt': row[5].isoformat() if row[5] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'guests': guests}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
