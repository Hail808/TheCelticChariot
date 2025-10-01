CREATE TABLE guest (
    guest_id SERIAL PRIMARY KEY,                        
    email VARCHAR(100) NOT NULL,                        
    phone_num VARCHAR(20),                              
    session_token TEXT,                                 
    last_login TIMESTAMP,                               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP      
);


CREATE UNIQUE INDEX idx_guest_email ON guest(email);


ALTER TABLE guest ADD CONSTRAINT chk_guest_phone CHECK (phone_num ~ '^[0-9+()-]{7,20}$');

INSERT INTO guest (email, phone_num, session_token, last_login)
VALUES (
  'guest25@gmail.com',
  '+15551234567',
  gen_random_uuid()::text, 
  NOW()
)
RETURNING guest_id, session_token;

SELECT * 
FROM guest
WHERE email = 'guest25@gmail.com' 
  AND session_token = 'the-session-token';


  ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_guest_id FOREIGN KEY (fk_guest_id) REFERENCES public.guest(guest_id);