type LoginOptions = {
    method: 'POST' | 'GET'
    headers: Record<string, string>
    body?: string
    credentials?: RequestCredentials
}

export const useAuth = () => {
    const token = useState<string | null>('token', () => null)
    const user = useState<any | null>('user', () => null)

    const login = async (email: string, password: string) => {
        if (!email || !password) return

        const options: LoginOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'text/plain' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        };
        
        try{
            type LoginResponse = { 
                access_token: string
                token_type: string
                expires_in: number
            }
            const data = await $fetch<LoginResponse>('http://localhost/api/login', options)
            
            token.value = data.access_token

            return data
        }
        catch(error){
            throw new Error('Login State failed', error as any)
        }
    }
    
    const getUser = async () => {
        if (!token.value) return null
        
        const options = {
            method: 'GET' as const,
            headers: { Authorization: `Bearer ${token.value}` },
        };

        try{
            const data = await useFetch('http://localhost/api/user', options)
            
            user.value = data

            return data
        }
        catch(error){
            console.error(error)
            return null
        }
    }

    const logout = () => {
        token.value = null
        user.value = null
        navigateTo('/login')
        return void 0
    }

    const refreshToken = async () => {
        const options = {
            method: 'POST' as const,
            credentials: 'include' as RequestCredentials,
        };
        
        try{
            type RefreshResponse = { 
                access_token: string
                token_type: string
                expires_in: number
            }
            const data = await $fetch<RefreshResponse>('http://localhost/api/auth/refresh', options)
            
            return
        }
        catch(error){
            console.error(error)
            return
        }
    }

    return { login, token, getUser, logout, refreshToken }
}