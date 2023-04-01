<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/UI/Header/MainHeader.vue'
</script>

<template>
  <Header />
  <div class="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
    <RouterView />
  </div>
</template>
