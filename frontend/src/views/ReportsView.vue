<template>
  <div class="fixed inset-0 flex flex-col p-4 overflow-hidden max-w-7xl m-auto">
    <div class="flex-shrink-0 mt-4 mb-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-1">Patient Reports</h1>
      <p class="text-sm text-gray-500">View and monitor patient cardiac reports</p>
    </div>
    <ReportFilter v-model="patientNameFilter" class="flex-shrink-0 mb-4" />
    <div class="flex-1 min-h-0 overflow-hidden">
      <ReportList :filter="{ patientName: patientNameFilter }" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ReportList from '../components/ReportList.vue';
import ReportFilter from '../components/ReportFilter.vue';

export default defineComponent({
  name: 'ReportsView',
  components: {
    ReportList,
    ReportFilter
  },
  setup() {
    const patientNameFilter = ref('');
    
    return {
      patientNameFilter
    };
  }
});
</script>
