import { mount } from '@vue/test-utils'
import ReportFilter from '../ReportFilter.vue'
import { describe, it, expect, vi } from 'vitest'

describe('ReportFilter.vue', () => {
  it('renders correctly with default props', () => {
    const onFilterUpdate = vi.fn()
    const wrapper = mount(ReportFilter, {
      props: {
        patientNameFilter: '',
        onFilterUpdate,
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false) // Clear button shouldn't be visible with empty filter
  })

  it('shows clear button when filter has value', () => {
    const onFilterUpdate = vi.fn()
    const wrapper = mount(ReportFilter, {
      props: {
        patientNameFilter: 'Test',
        onFilterUpdate,
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('calls onFilterUpdate when input changes', async () => {
    const onFilterUpdate = vi.fn()
    const wrapper = mount(ReportFilter, {
      props: {
        patientNameFilter: '',
        onFilterUpdate,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test')

    expect(onFilterUpdate).toHaveBeenCalledWith('test')
  })

  it('calls onFilterUpdate with empty string when clear button is clicked', async () => {
    const onFilterUpdate = vi.fn()
    const wrapper = mount(ReportFilter, {
      props: {
        patientNameFilter: 'test', // Non-empty to show the clear button
        onFilterUpdate,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(onFilterUpdate).toHaveBeenCalledWith('')
  })
})
