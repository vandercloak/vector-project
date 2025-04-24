export interface Report {
  id: number;
  patientName: string;
  date: Date;
  summary: string;
  hasTachycardia?: boolean;
  hasArrhythmia?: boolean;
}
