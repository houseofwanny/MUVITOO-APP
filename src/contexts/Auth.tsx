import {useContext, createContext, useState, useEffect} from 'react'
import {supabase} from '../supabase'
import {AuthError, AuthResponse, User} from "@supabase/supabase-js";

interface UserData {
    email: string,
    password: string
}

type iAuthContext = {
    signUp: (data: any) => Promise<AuthResponse>,
    signIn: (data: any) => Promise<AuthResponse>,
    signOut?: () => Promise<{ error: AuthError | null; }>,
    user: User | null,
}

const AuthContext = createContext<iAuthContext>({
    user: null,
    signUp: (data: any) => supabase.auth.signUp(data),
    signIn: (data: any) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut()
});

export function AuthProvider({children}: any) {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions and sets the user
        const getSession = async () => {
            return await supabase.auth.getUser()
        }
        getSession().then(response => {
            setUser(response.data.user ?? null)
            setLoading(false)
        })


        // Listen for changes on auth state (logged in, signed out, etc.)
        const {data: listener} = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session?.user ?? null)
            }
            setLoading(false)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data: any) => supabase.auth.signUp(data),
        signIn: (data: any) => supabase.auth.signInWithPassword(data),
        signOut: () => supabase.auth.signOut(),
        user,
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}