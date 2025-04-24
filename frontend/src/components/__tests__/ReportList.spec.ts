import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ReportList from '../ReportList.vue'
import { getReports } from '@/services/api'

// Mock the API service
vi.mock('@/services/api', () => ({
  getReports: vi.fn(),
}))

describe('ReportList.vue', () => {
  const mockReports = [
    {
      id: 1,
      patientName: 'John Smith',
      date: '2023-01-15T09:30:00',
      summary: 'Patient showing signs of tachycardia',
      hasTachycardia: true,
      hasArrhythmia: false,
    },
    {
      id: 2,
      patientName: 'Jane Doe',
      date: '2023-01-16T10:45:00',
      summary: 'Normal heart rhythm',
      hasTachycardia: false,
      hasArrhythmia: false,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays loading state initially', () => {
    ;(getReports as any).mockResolvedValue([])
    const wrapper = mount(ReportList)
    expect(wrapper.text()).toContain('Loading reports...')
  })

  it('displays reports after loading', async () => {
    ;(getReports as any).mockResolvedValue(mockReports)
    const wrapper = mount(ReportList)

    await flushPromises()

    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.text()).toContain('John Smith')
    expect(wrapper.text()).toContain('Jane Doe')
  })

  it('displays error message when API fails', async () => {
    ;(getReports as any).mockRejectedValue(new Error('API error'))
    const wrapper = mount(ReportList)

    await flushPromises()

    expect(wrapper.text()).toContain('Failed to load reports')
  })

  it('displays "No reports found" when empty array is returned', async () => {
    ;(getReports as any).mockResolvedValue([])
    const wrapper = mount(ReportList)

    await flushPromises()

    expect(wrapper.text()).toContain('No reports found for the current filter')
  })

  it('formats dates correctly', async () => {
    ;(getReports as any).mockResolvedValue(mockReports)
    const wrapper = mount(ReportList)

    await flushPromises()

    // This will depend on the locale of the test environment
    // Using a more flexible test to avoid locale issues
    const dateCell = wrapper.findAll('tbody tr')[0].findAll('td')[1]
    expect(dateCell.text()).toContain('2023')
    expect(dateCell.text()).toContain('January')
    expect(dateCell.text()).toContain('15')
  })

  it('applies warning style to reports with critical conditions', async () => {
    ;(getReports as any).mockResolvedValue(mockReports)
    const wrapper = mount(ReportList)

    await flushPromises()

    const rows = wrapper.findAll('tbody tr')
    expect(rows[0].classes()).toContain('bg-red-50') // John Smith has tachycardia
    expect(rows[1].classes()).not.toContain('bg-red-50') // Jane Doe is normal
  })

  it('displays correct status badges', async () => {
    ;(getReports as any).mockResolvedValue(mockReports)
    const wrapper = mount(ReportList)

    await flushPromises()

    // John Smith should have tachycardia badge
    const johnSmithRow = wrapper.findAll('tbody tr')[0]
    expect(johnSmithRow.text()).toContain('⚠️ Tachycardia')
    expect(johnSmithRow.text()).not.toContain('Normal')

    // Jane Doe should have normal badge
    const janeDoeRow = wrapper.findAll('tbody tr')[1]
    expect(janeDoeRow.text()).toContain('Normal')
    expect(janeDoeRow.text()).not.toContain('⚠️')
  })

  it('fetches reports when filter changes', async () => {
    ;(getReports as any).mockResolvedValue(mockReports)
    const wrapper = mount(ReportList, {
      props: {
        filter: { patientName: '' },
      },
    })

    await flushPromises()
    expect(getReports).toHaveBeenCalledWith({ patientName: '' })

    await wrapper.setProps({
      filter: { patientName: 'John' },
    })

    expect(getReports).toHaveBeenCalledWith({ patientName: 'John' })
  })
})
