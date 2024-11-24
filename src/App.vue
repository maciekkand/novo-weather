<template>
  <div class="h-screen bg-gray-200 p-6">
    <h1 class="text-3xl text-blue-500 mb-2">Weather</h1>

    <WeatherLocation @find="findLocation" />

    <div
      v-if="errorMsg"
      class="text-red-500 mt-4"
      data-e2e="error-message"
    >{{ errorMsg }}</div>

    <WeatherTable
      v-if="location"
      :location
      :weatherResults
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WeatherLocation from './components/WeatherLocation.vue'
import WeatherTable from './components/WeatherTable.vue'
import { fetchCoords, fetchWeather } from './utils/weatherRequests.js'

const weatherResults = ref(null)
const location = ref('')
const errorMsg = ref('')

async function findLocation(searchQuery) {
  try {
    const coords = await fetchCoords(searchQuery)
    weatherResults.value = await fetchWeather(coords)
    location.value = searchQuery
    errorMsg.value = ''
  }
  catch (e) {
    weatherResults.value = null
    location.value = ''
    errorMsg.value = 'Failed to fetch weather data. Please try again.'
  }
}
</script>
