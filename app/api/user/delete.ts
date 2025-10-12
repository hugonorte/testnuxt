const VITE_EXTERNAL_API_URL = import.meta.env.VITE_EXTERNAL_API_URL

export async function deleteUser(id: number): Promise<void> {
    const auth = useAuth()
    const token = auth.token.value
    if (!token) throw new Error('Nenhum token de autenticação disponível');

    try {
        const options = {
            method: 'DELETE' as 'DELETE',
            credentials: 'include' as RequestCredentials,
            headers: {} as Record<string, string>,
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        await $fetch(`${VITE_EXTERNAL_API_URL}/users/${id}`, options);

    } catch (error) {
        console.error('API - Error during delete:', error);
        throw error;
    }
}