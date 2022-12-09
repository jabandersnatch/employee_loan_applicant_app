-- This is the schema for the employee loan applicant database

-- Create the employee_loan_applicant table

CREATE TABLE employee_loan_applicant (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  document_number VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  enterprise_id VARCHAR(50) NOT NULL,
   );

  -- Insert some data into the employee_loan_applicant TABLE

INSERT INTO employee_loan_applicant (first_name, last_name, document_type, document_number, email, phone, enterprise_id)
VALUES ('Juan Carlos', 'Romero', 'CC', '123456789', 'juanromero@mail.com','+57 300 1234567', '1')
, ('Maria', 'Gomez', 'CC', '987654321', 'mariagomez@mail.com','+57 300 7654321', '1')
, ('Pedro', 'Perez', 'CC', '123456789', 'pedroperez@mail.com','+57 300 1234567', '1')
, ('Luisa', 'Gonzalez', 'CC', '987654321', 'luisagonzales@mail.com','+57 300 7654321', '2')
, ('Carlos', 'Gomez', 'CC', '123456789', 'carlosgomez@mail.com','+57 300 1234567', '2');
