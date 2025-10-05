<script lang="ts" setup>
import { createUser } from '~/api/user/post'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import type { User } from "~/types/models";

const schema = z.object({
    first_name: z.string().min(2, { message: 'O primeiro nome deve ter pelo menos 2 caracteres' }),
    last_name: z.string().min(2, { message: 'O sobrenome ter pelo menos 2 caracteres' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),   
    password_confirmation: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
})

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: firstNameField, errorMessage: firstNameFieldError } = useField<string>('first_name')
const { value: lastNameField, errorMessage: lastNameFieldError } = useField<string>('last_name')
const { value: emailField, errorMessage: emailError } = useField<string>('email')
const { value: passwordField, errorMessage: passwordFieldError } = useField<string>('password')
const { value: passwordConfirmationField, errorMessage: passwordConfirmationFieldError } = useField<string>('password_confirmation')

const onSubmit = handleSubmit(
  async (values) => {
    const newUser = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    };

    try {
      await createUser(newUser);
      resetForm();
    } 
    catch (error) {
      console.error('PAGE - Error creating candidate:', error);
      // Optionally, handle the error (e.g., show an error message)
    }
  },
  (validationErrors) => {
    console.error('❌ Erros de validação:', validationErrors.errors)
  },
)
</script>

<template>
    <h1>New User</h1>
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
            <div>
                <label for="password">Senha</label>
                <input type="password" name="password" id="password" v-model="passwordField">
                <span>{{ passwordFieldError }}</span>
            </div>
            <div>
                <label for="password_confirmation">Confirmação de Senha</label>
                <input type="password" name="password_confirmation" id="password_confirmation" v-model="passwordConfirmationField">
                <span>{{ passwordConfirmationFieldError }}</span>
            </div>
        </fieldset>
        <button>
            Enviar formulário
        </button>
    </form>
</template>

<style>
fieldset {
    display: flex;
    flex-direction: column;
    gap:0.888rem;
    font-size: 1rem;

    div {
        display: flex;
        flex-direction: column;
        gap:0.3rem;
        font-size: 1rem;

        span {
            color:red;
        }
    }

    label {
        font-weight:bold;
    }
}
</style>