<script lang="ts" setup>
import type { User } from '@/types/models'

const route = useRoute()
const userId = route.params.id as string
const User = ref<User | null>(null)
</script>

<template>
    <h1>Edit User {{ userId }}</h1>
</template>
