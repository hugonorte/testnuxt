/*
import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const { access_token } = await $fetch<{ access_token: string }>(
          'http://localhost:8000/api/auth/login',
          {
            method: 'POST',
            body: { email, password }
          }
        )

        this.token = access_token

        // Busca os dados do usuário logado
        await this.getUser()
      } catch (err: any) {
        console.error('Erro no login:', err)
        throw err
      }
    },

    async getUser() {
      if (!this.token) return

      try {
        this.user = await $fetch<User>('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
      } catch (err) {
        console.error('Erro ao buscar usuário:', err)
      }
    },

    logout() {
      this.token = null
      this.user = null
    }
  },

  persist: true // se usar pinia-plugin-persistedstate
})

*/
