export const useAuth = () => {

    const login = async (email: string, password: string) => {
        if (!email || !password) return
        
        const options = {
            method: 'POST' as const,
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
            const { data, pending, error } = await useFetch<LoginResponse>('http://localhost/api/login', options)
            console.log(data.value)
            
            token.value = data.value?.access_token ?? null
            return
        }
        catch(error){
            console.error(error)
            return
        }
    }
    
    const token = useState<string | null>('token', () => null)
    
    const getUser = async () => {
        if (!token.value) return

        const options = {
            method: 'GET' as const,
            headers: { Authorization: `Bearer ${token.value}` },
        };

        try{
            const { data, pending, error } = await useFetch('http://localhost/api/user', options)
            console.log(data.value)
            return
        }
        catch(error){
            console.error(error)
            return
        }
    }

    const logout = () => {
        token.value = null
        getUser()
        
        return navigateTo('/login')
    }

    return { login, token, getUser, logout }
}