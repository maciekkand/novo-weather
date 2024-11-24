<template>
  <form @submit.prevent="searchLocation">

    <input
      placeholder="Enter location"
      v-model="location"
      class="w-64 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      data-e2e="location-input"
    />

    <button
      type="submit"
      class="px-8 py-2 ml-4 text-white bg-blue-500 rounded-lg"
      data-e2e="search-button"
    >Search</button>

  </form>
</template>

<script setup>
import { ref } from 'vue'

const location = ref('')
const emit = defineEmits(['find'])

function searchLocation() {
  if (location.value.trim()) {
    emit('find', location.value)
  }
}
</script>
