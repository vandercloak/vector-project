import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReportFilter from '../ReportFilter.vue'
import SearchIcon from '@/icons/SearchIcon.vue'

describe('ReportFilter.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(ReportFilter, {
      global: {
        components: { SearchIcon },
      },
    })
    expect(wrapper.find('h3').text()).toBe('Filter Reports:')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search by patient name...')
  })

  it('emits update:modelValue event when input changes', async () => {
    const wrapper = mount(ReportFilter, {
      global: {
        components: { SearchIcon },
      },
    })

    await wrapper.find('input').setValue('John Smith')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['John Smith'])
  })

  it('displays clear button only when there is input', async () => {
    const wrapper = mount(ReportFilter, {
      props: { modelValue: '' },
      global: {
        components: { SearchIcon },
      },
    })

    expect(wrapper.find('button').exists()).toBe(false)

    await wrapper.setProps({ modelValue: 'test' })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits empty string when clear button is clicked', async () => {
    const wrapper = mount(ReportFilter, {
      props: { modelValue: 'test' },
      global: {
        components: { SearchIcon },
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
  })
})
