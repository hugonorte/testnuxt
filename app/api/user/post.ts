import type { User } from "~/types/models";
//const VITE_EXTERNAL_API_URL = import.meta.env.VITE_EXTERNAL_API_URL

const auth = useAuth()
const token = auth.token.value

export async function createUser(userData: User): Promise<User> {
    if (!token) throw new Error('Nenhum token de autenticação disponível');

    try {
        const options = {
            method: 'POST' as 'POST',
            body: JSON.stringify(userData),
            credentials: 'include' as RequestCredentials,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            } as Record<string, string>,
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const data = await $fetch<User>('http://localhost/api/users/', options);

        return data;

  } catch (error) {
    console.error('API - Error during fetch:', error);
    throw error;
  }
}