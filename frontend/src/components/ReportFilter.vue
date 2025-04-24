<template>
  <div class="mb-4 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
    <div class="flex flex-wrap items-center gap-4">
      <h3 class="text-sm font-medium text-gray-700">Filter Reports:</h3>
      <div class="flex-1 min-w-[200px]">
        <div class="relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size="16" classes="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            :value="modelValue"
            @input="updateFilter"
            placeholder="Search by patient name..."
            class="pl-8 pr-8 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm transition-colors duration-200"
            />
          <div v-if="modelValue" class="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button @click="clearFilter" class="text-gray-400 hover:text-gray-500 focus:outline-none p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SearchIcon from '@/icons/SearchIcon.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ReportFilter',
  components: {
    SearchIcon
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateFilter = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value.trim())
    }

    const clearFilter = () => {
      emit('update:modelValue', '')
    }

    return {
      updateFilter,
      clearFilter
    }
  },
})

</script>
