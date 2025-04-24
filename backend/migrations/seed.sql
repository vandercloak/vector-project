CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patientName VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  summary TEXT NOT NULL,
  hasTachycardia BOOLEAN GENERATED ALWAYS AS (summary LIKE '%tachycardia%') STORED,
  hasArrhythmia BOOLEAN GENERATED ALWAYS AS (summary LIKE '%arrhythmia%') STORED,
  INDEX idx_patientName (patientName),
  INDEX idx_tachycardia (hasTachycardia),
  INDEX idx_arrhythmia (hasArrhythmia)
);

-- Insert sample data
INSERT INTO reports (patientName, date, summary) VALUES
('John Smith', '2023-07-15 08:30:00', 'Patient presented with fever and cough. No signs of tachycardia or other complications.'),
('Emily Johnson', '2023-07-14 10:15:00', 'Routine checkup. Patient has a history of arrhythmia, currently well-controlled with medication.'),
('Michael Brown', '2023-07-13 14:45:00', 'Post-operative follow-up. Recovery progressing well. No complications noted.'),
('Sarah Davis', '2023-07-12 09:00:00', 'Emergency admission with severe chest pain. ECG showed signs of tachycardia. Admitted for observation.'),
('James Wilson', '2023-07-11 16:30:00', 'Diabetic review. Blood sugar levels improved. No cardiac issues detected.'),
('Linda Martinez', '2023-07-10 11:20:00', 'Patient complained of palpitations. ECG revealed paroxysmal arrhythmia. Started on beta-blockers.'),
('Robert Taylor', '2023-07-09 13:10:00', 'Annual physical examination. Overall health excellent. No concerns.'),
('Jennifer Anderson', '2023-07-08 15:45:00', 'Patient presented with shortness of breath and tachycardia. Referred to cardiology.'),
('David Thomas', '2023-07-07 10:30:00', 'Follow-up after medication adjustment. Patient reports improved symptoms. No arrhythmia detected on monitoring.'),
('Lisa Jackson', '2023-07-06 09:15:00', 'New patient consultation. Family history of heart disease. No active issues.');
