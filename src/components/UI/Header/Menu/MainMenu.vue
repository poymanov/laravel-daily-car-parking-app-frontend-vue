<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
</script>

<template>
  <RouterLink class="router-link" :to="{ name: 'home' }">Home</RouterLink>
  <template v-if="auth.check">
    <RouterLink class="router-link" :to="{ name: 'parkings.active' }">Parkings</RouterLink>
    <RouterLink class="router-link" :to="{ name: 'vehicles.index' }">Vehicles</RouterLink>
  </template>
</template>
