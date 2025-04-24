import type { Report } from '../types/report'

const API_BASE_URL = '/api'

export async function getReports(filters: { patientName?: string } = {}): Promise<Report[]> {
  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}/reports`, window.location.origin)

  if (filters.patientName) {
    url.searchParams.append('patientName', filters.patientName)
  }

  // Make request
  const response = await fetch(url.toString())

  // Handle errors
  if (!response.ok) {
    throw new Error(`Error fetching reports: ${response.status} ${response.statusText}`)
  }

  // Parse JSON response
  return response.json()
}

export async function getReportById(id: number): Promise<Report> {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`)

  if (!response.ok) {
    throw new Error(`Error fetching report: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
