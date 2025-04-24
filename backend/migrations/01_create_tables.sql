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

