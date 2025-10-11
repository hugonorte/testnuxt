const VITE_EXTERNAL_API_URL = import.meta.env.VITE_EXTERNAL_API_URL
import type { User } from '~/types/models';


export async function changeUser(userData: User): Promise<User> {
    const auth = useAuth()
    const token = auth.token.value
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(userData),
    credentials: 'include' as RequestCredentials,
    headers,
  };

  const response = await fetch(`${VITE_EXTERNAL_API_URL}/users/${userData.id}`, options);
  const contentType = response.headers.get('content-type')

  if (!response.ok) {
    let errorMessage = 'Erro desconhecido.'
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json()
      errorMessage = errorData?.message || JSON.stringify(errorData)
    } else {
      errorMessage = await response.text()
    }

    throw new Error(`Erro ao alterar usuário: ${errorMessage}`)
  }

  return await response.json()
}