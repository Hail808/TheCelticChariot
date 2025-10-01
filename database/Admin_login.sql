CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) Default 'admin',
    last_login TIMESTAMP,
    login_attempts INT DEFAULT 0,
    account_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_username ON admin(username);

ALTER TABLE admin ADD CONSTRAINT chk_role CHECK (role IN ('admin','superadmin'));


INSERT INTO admin (username, password_hash, email, role)
VALUES (
  'admin',
  crypt('SuperSecurePass123', gen_salt('bf')),
  'admin@example.com',
  'superadmin'
);


SELECT * 
FROM admin 
WHERE username = 'admin' 
  AND password_hash = crypt('SuperSecurePass123', password_hash);

UPDATE admin
SET last_login = NOW(),
    login_attempts = 0 
WHERE username = 'admin';




UPDATE admin
SET login_attempts = login_attempts + 1,
    account_locked = CASE WHEN login_attempts + 1 >= 5 THEN TRUE ELSE account_locked END
WHERE username = 'admin';