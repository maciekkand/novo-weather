<template>
  <div
    class="p-6 mt-2 bg-white rounded-lg shadow-xl w-96"
    data-e2e="weather-table"
  >
    <h2 class="mb-2 -mt-2 text-xl text-center">{{ capitalizedLocation }}</h2>

    <div class="grid grid-cols-2 gap-6">
      <WeatherTile
        title="Temperature"
        :value="weatherResults.temperature"
        data-e2e="weather-temperature"
      />

      <WeatherTile
        title="Apparent Temp."
        :value="weatherResults.apparent_temperature"
        data-e2e="weather-apparent-temperature"
      />

      <WeatherTile
        title="Wind Speed"
        :value="weatherResults.windspeed"
        data-e2e="weather-windspeed"
      />

      <WeatherTile
        title="Visibility"
        :value="weatherResults.visibility"
        data-e2e="weather-visibility"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import WeatherTile from './WeatherTile.vue'

const props = defineProps({
  location: String,
  weatherResults: Object
})

const capitalizedLocation = computed(() =>
 props.location[0].toUpperCase() + props.location.slice(1)
)


</script>

