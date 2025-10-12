<script lang="ts" setup>
import type { User } from '@/types/models'
import { ref, onMounted } from 'vue'
import { fetchAllUsers } from '@/api/user/get'
import {deleteUser} from '@/api/user/delete'

const users = ref<User[]>([])

const fetchUsers = async () => {
  try {
    users.value = await fetchAllUsers()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
onMounted(fetchUsers)

const handleDelete = async (userId: string) => {
  try {
    await deleteUser(Number(userId))
    users.value = users.value.filter(user => user.id !== Number(userId))
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

</script>
<template>
    <h1>Index Users</h1>
    <ul>
        <li>
            <NuxtLink to="/admin/users/create">
                <button>New User</button>
            </NuxtLink>
        </li>
    </ul>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.first_name }} {{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <NuxtLink :to="`/admin/users/edit/${user.id}`">
                        <button>Edit</button>
                    </NuxtLink>
                </td>
                <td>
                    <button @click="handleDelete(String(user.id))">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>