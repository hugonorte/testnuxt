<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ]
})
</script>

<template>
  <div class="main_container">
    <div class="left">
      <NavLeft />
    </div>
    <div class="right">
      <Header />
      <slot />
    </div>
  </div>
</template>