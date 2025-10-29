CREATE TABLE guest (
    guest_id SERIAL PRIMARY KEY,                        
    email VARCHAR(100) NOT NULL,                        
    phone_num VARCHAR(20),                              
    session_token UUID DEFAULT gen_random_uuid(),
    session_expires TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours'),
    device_info TEXT,  
    ip_address INET,                                
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP      
);


ALTER TABLE guest 
    ADD CONSTRAINT chk_guest_email 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE guest 
    ADD CONSTRAINT chk_guest_phone 
    CHECK (phone_num IS NULL OR phone_num ~ '^[0-9+() -]{7,20}$');


CREATE OR REPLACE FUNCTION update_guest_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_guest_timestamp
BEFORE UPDATE ON guest
FOR EACH ROW
EXECUTE FUNCTION update_guest_timestamp();



CREATE UNIQUE INDEX idx_guest_email ON guest(email);
CREATE INDEX idx_guest_session_token ON guest(session_token);
CREATE INDEX idx_guest_last_login ON guest(last_login);


INSERT INTO guest (email, phone_num, ip_address, device_info)
VALUES 
('guest25@gmail.com', '+15551234567', '192.168.1.12', 'Chrome on Windows 10'),
('shopper101@example.com', NULL, '172.16.0.55', 'Safari on iPhone'),
('quickbuyer@yahoo.com', '+15559874532', '10.0.0.9', 'Firefox on Android');


SELECT *
FROM guest
WHERE email = 'guest25@gmail.com'
  AND session_token = 'the-session-token'
  AND session_expires > NOW();



ALTER TABLE IF EXISTS public.orders
ADD COLUMN IF NOT EXISTS fk_guest_id INT;

ALTER TABLE ONLY public.orders
ADD CONSTRAINT fk_guest_id FOREIGN KEY (fk_guest_id)
REFERENCES public.guest(guest_id)
ON DELETE SET NULL;



CREATE OR REPLACE VIEW v_active_guests AS
SELECT 
    guest_id,
    email,
    ip_address,
    device_info,
    last_login,
    session_expires,
    (session_expires - NOW()) AS time_remaining
FROM guest
WHERE session_expires > NOW()
ORDER BY last_login DESC;


CREATE OR REPLACE FUNCTION expire_old_sessions()
RETURNS VOID AS $$
BEGIN
  UPDATE guest
  SET session_token = NULL
  WHERE session_expires < NOW();
END;
$$ LANGUAGE plpgsql;


