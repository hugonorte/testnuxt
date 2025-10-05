<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { fetchOneUser } from '~/api/user/get'
import type { User } from '~/types/models'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'

const route = useRoute()
const userId = route.params.id as string
const User = ref<User | null>(null)

const initialValues = ref({
  first_name: '',
  last_name: '',
  email: '',
})

const schema = z.object({
  first_name: z.string().min(2, { message: 'O primeiro nome deve ter pelo menos 2 caracteres' }),
  last_name: z.string().min(2, { message: 'O sobrenome ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
})

// 1) Crie o form primeiro — assim os useField() abaixo ficam vinculados a ele
const { handleSubmit, setValues, resetForm, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: initialValues.value,
})

// 2) Depois crie os campos (useField)
const { value: firstNameField, errorMessage: firstNameFieldError } = useField<string>('first_name')
const { value: lastNameField, errorMessage: lastNameFieldError } = useField<string>('last_name')
const { value: emailField, errorMessage: emailError } = useField<string>('email')

const onSubmit = handleSubmit(
  async (values) => {
    console.log(values)
  },
  (validationErrors) => {
    console.error('❌ Erros de validação:', validationErrors.errors)
  },
)

const fetchOneUserAsync = async () => {
  try {
    const user = await fetchOneUser(userId)
    User.value = user

    await nextTick()

    resetForm({
      values: {
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        email: user.email ?? '',
      },
    })

  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

onMounted(fetchOneUserAsync)
</script>


<template>
  <div>
    <h1>User Details</h1>
    <form @submit.prevent="onSubmit">
        <fieldset>
            <div>
                <label for="first_name">Primeiro Nome</label>
                <input type="text" name="first_name" id="first_name" v-model="firstNameField">
                <span>{{ firstNameFieldError }}</span>
            </div>
            <div>
                <label for="last_name">Sobrenome</label>
                <input type="text" name="last_name" id="last_name" v-model="lastNameField">
                <span>{{ lastNameFieldError }}</span>
            </div>
            <div>
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" v-model="emailField">
                <span>{{ emailError }}</span>
            </div>
        </fieldset>
        <button>
            Salvar Alterações
        </button>
    </form>
  </div>
</template>