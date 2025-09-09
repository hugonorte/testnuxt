<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const auth = useAuth()
const logout = auth.logout
</script>

<template>
    <h1>Dashboard</h1>
    <NuxtLink to="/protectedPage">Protected Page</NuxtLink>
    <button @click="logout">Logout</button>
</template>