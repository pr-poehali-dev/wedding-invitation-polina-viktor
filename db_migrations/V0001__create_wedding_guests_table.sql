CREATE TABLE IF NOT EXISTS wedding_guests (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    food_preferences TEXT[],
    allergy_text TEXT,
    drink_preferences TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);