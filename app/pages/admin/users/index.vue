<script lang="ts" setup>
import type { User } from '@/types/models'
import { ref, onMounted } from 'vue'
import { fetchAllUsers } from '@/api/user/get'

const users = ref<User[]>([])

const fetchUsers = async () => {
  try {
    users.value = await fetchAllUsers()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
onMounted(fetchUsers)

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
                <th>Actions</th>
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
            </tr>
        </tbody>
    </table>
</template>