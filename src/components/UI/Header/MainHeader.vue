<script setup>
import GuestMenu from '@/components/UI/Header/Menu/GuestMenu.vue'
import UserMenu from '@/components/UI/Header/Menu/UserMenu.vue'
import MainMenu from '@/components/UI/Header/Menu/MainMenu.vue'
import Logo from '@/components/UI/Header/HeaderLogo.vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
</script>

<template>
  <header class="py-6 bg-gray-100 shadow">
    <div class="container md:px-2 px-4 mx-auto">
      <nav class="flex gap-4 justify-between">
        <div class="flex gap-4 items-center">
          <Logo />
          <MainMenu />
        </div>
        <div class="flex gap-4 items-center">
          <UserMenu v-if="auth.check" />
          <GuestMenu v-else />
        </div>
      </nav>
    </div>
  </header>
</template>
