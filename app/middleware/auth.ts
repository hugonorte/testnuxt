import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuth } from '../app/composables/useAuth'

const isAuthenticated = () => {
  const { token } = useAuth()
  return !!token.value
}

export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
