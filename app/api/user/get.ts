import type { User } from "~/types/models";
const VITE_EXTERNAL_API_URL = import.meta.env.VITE_EXTERNAL_API_URL

export async function fetchOneUser(userId: string) {

    try {
        const options = {
            method: 'GET' as 'GET',
            credentials: 'include' as RequestCredentials,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            } as Record<string, string>,
        };

        const data = await $fetch<User>(`${VITE_EXTERNAL_API_URL}/users/${userId}`, options);

        return data;

  } catch (error) {
    console.error('API - Error during fetch:', error);
    throw error;
  }
}