<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink class="router-link" :to="{ name: 'login' }">Login</RouterLink>
  <RouterLink class="router-link" :to="{ name: 'register' }">Register</RouterLink>
</template>
