<script setup>
import { useAuth } from '@/stores/auth'
import { useProfile } from '@/stores/profile'
import { RouterLink } from 'vue-router'

const auth = useAuth()
const profile = useProfile()

if (auth.check) {
  profile.fetchCurrentUser()
}
</script>

<template>
  <div class="group inline-block relative">
    <button class="text-gray-700 py-2 px-4 rounded inline-flex items-center">
      <span class="mr-1">{{ profile.currentUser.name }}</span>
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </button>
    <ul class="absolute hidden text-gray-700 pt-1 group-hover:block">
      <li>
        <RouterLink
          class="router-link rounded-t bg-gray-200 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap"
          :to="{ name: 'profile.edit' }"
          >Profile</RouterLink
        >
      </li>
      <li>
        <button
          @click="auth.logout"
          class="router-link rounded-b bg-gray-200 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap"
        >
          Logout
        </button>
      </li>
    </ul>
  </div>
</template>
