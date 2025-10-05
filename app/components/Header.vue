<script setup lang="ts">
const auth = useAuth()
const logout = auth.logout
const user = await auth.getUser() as { name: string }
</script>

<template>
    <header>
        <nav>
            <div v-if="user">
                Olá, {{ user.name  }}
            </div>
            <div>
                <NuxtLink to="/admin/dashboard">Página Inicial</NuxtLink>
            </div>
            <div>
                <a @click="logout">Logout</a>
            </div>
        </nav>
    </header>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>