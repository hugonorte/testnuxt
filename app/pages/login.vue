<script setup lang="ts">
//import { useAuthStore } from '~/stores/auth'
import { ref } from 'vue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'

const schema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
})

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: emailField, errorMessage: emailError } = useField<string>('email')
const { value: passwordField, errorMessage: passwordError } = useField<string>('password')

const color = useTestString()
const testObject = useTestObject()
const auth = useAuth()

const onSubmit = handleSubmit(
  async (values) => {
    try {
      await auth.login(values.email, values.password)

      return navigateTo('/dashboard')
    } catch (error) {
      console.error('Erro ao efetuar o login:', error)
    }
  },
  (validationErrors) => {
    console.error('❌ Erros de validação:', validationErrors.errors)
  },
)
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <!-- <p>Teste Use State: {{ color }}</p>
    <p>Teste Use State de objeto: {{ testObject.barObject }}</p>
    <p>Teste Use State de objeto: {{ testObject.bla }}</p>
    <p>Teste Use State de objeto: {{ testObject.foo }}</p> -->

    <form @submit.prevent="onSubmit">
      <div>
        <label>Email</label>
        <input v-model="emailField" type="email" required />
        <span v-if="emailError" class="error_message">{{ emailError }}</span>
      </div>

      <div>
        <label>Senha</label>
        <input v-model="passwordField" type="password" required />
        <span v-if="passwordError" class="error_message">{{ passwordError }}</span>
      </div>

      <button type="submit">Entrar</button>
    </form>

    
  </div>
</template>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
}
</style>
