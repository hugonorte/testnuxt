<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const auth = useAuth()
const logout = auth.logout
</script>

<template>
    <h1>Dashboard</h1>
    <h3>Menu</h3>
    <ul>
      <li>Blog</li>
      <li>
        <NuxtLink to="/protectedPage">Protected Page</NuxtLink>
      </li>
    </ul>
    <h5>Admin</h5>
    <ul>
      <li>
        <NuxtLink to="/admin/users/">Users</NuxtLink>
      </li>
    </ul>
    <ul>
      <li>
        <button @click="logout">Logout</button>
      </li>
    </ul>  
</template>