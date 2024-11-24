<template>
  <div class="text-center">
    <div class="text-gray-600">{{ title }}</div>
    <div
      class="text-3xl"
      data-e2e="weather-parameter"
    >{{ formattedValue }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: Number
})

const formattedValue = computed(() => props.value.toLocaleString())
</script>
