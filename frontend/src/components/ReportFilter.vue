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
            :value="patientNameFilter"
            @input="updateFilter"
            placeholder="Search by patient name..."
            class="pl-8 pr-8 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm transition-colors duration-200"
          />
          <div v-if="patientNameFilter" class="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button
              @click="clearFilter"
              class="text-gray-400 hover:text-gray-500 focus:outline-none p-1"
            >
              <XIcon size="16" classes="h-4 w-4 text-gray-400 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/icons/SearchIcon.vue'
import XIcon from '@/icons/XIcon.vue'

// Define props with defaults
const props = defineProps<{
  patientNameFilter: string
  onFilterUpdate: (value: string) => void
}>()

// No need for default props since TypeScript will enforce required props

const updateFilter = (event: Event) => {
  const target = event.target as HTMLInputElement
  props.onFilterUpdate(target.value.trim())
}

const clearFilter = () => {
  props.onFilterUpdate('')
}
</script>
