CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50), 
  lastName VARCHAR(50), 
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
  );