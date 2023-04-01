<script setup>
import { defineProps } from 'vue'
const props = defineProps(['status'])
</script>

<template>
  <div
    class="alert mb-4"
    :class="{
      'alert-error': props.status.type === 'error',
      'alert-success': props.status.type === 'success'
    }"
    v-show="props.status.type"
  >
    {{ props.status.message }}
  </div>
</template>
