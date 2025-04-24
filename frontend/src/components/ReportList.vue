<template>
  <div class="h-full flex flex-col">
    <div v-if="loading && reports.length === 0" class="text-center py-4">
      <p class="text-gray-500">Loading reports...</p>
    </div>
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4"
    >
      {{ error }}
    </div>
    <div
      v-else-if="reports.length === 0"
      class="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md mb-4"
    >
      No reports found for the current filter.
    </div>
    <div v-else class="h-full overflow-auto shadow-sm rounded-lg border border-gray-200">
      <table class="w-full table-fixed divide-y divide-gray-200">
        <thead class="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th scope="col" class="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
            <th scope="col" class="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" class="w-2/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
            <th scope="col" class="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="report in reports" 
            :key="report.id"
            :class="{
              'bg-red-50': report.hasTachycardia || report.hasArrhythmia
            }"
          >
            <td class="px-6 py-4 truncate">
              <div class="font-medium text-gray-900">{{ report.patientName }}</div>
            </td>
            <td class="px-6 py-4 truncate text-sm text-gray-500">
              {{ formatDate(report.date) }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              <div class="line-clamp-2">{{ report.summary }}</div>
            </td>
            <td class="px-6 py-4 text-sm">
              <div class="flex gap-2 flex-wrap">
                <span v-if="report.hasTachycardia" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  ⚠️ Tachycardia
                </span>
                <span v-if="report.hasArrhythmia" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  ⚠️ Arrhythmia
                </span>
                <span v-if="!report.hasTachycardia && !report.hasArrhythmia" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Normal
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { getReports } from '../services/api'
import type { Report } from '../types/report'

export default defineComponent({
  name: 'ReportList',
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const reports = ref<Report[]>([])
    const loading = ref(true)
    const error = ref<string | null>(null)

    const fetchReports = async () => {
      loading.value = true
      error.value = null

      try {
        reports.value = await getReports(props.filter)
      } catch (err) {
        error.value = 'Failed to load reports. Please try again.'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    }

    // Fetch reports when filter changes
    watch(() => props.filter, fetchReports, { deep: true })

    // Initial fetch
    onMounted(fetchReports)

    return {
      reports,
      loading,
      error,
      formatDate,
    }
  },
})
</script>
