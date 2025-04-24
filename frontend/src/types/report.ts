export interface Report {
  id: number
  patientName: string
  date: string
  summary: string
  hasTachycardia?: boolean
  hasArrhythmia?: boolean
}
