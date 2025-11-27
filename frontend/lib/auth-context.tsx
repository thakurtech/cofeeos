"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    email: string
    name: string
    role: string
    shopId?: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem("auth_token")
        const storedUser = localStorage.getItem("user_data")

        if (token && storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error("Invalid credentials")
        }

        const data = await response.json()

        // Store token and user data
        localStorage.setItem("auth_token", data.access_token)
        localStorage.setItem("user_data", JSON.stringify(data.user))
        setUser(data.user)

        // Redirect based on role
        switch (data.user.role) {
            case "SUPER_ADMIN":
                router.push("/super-admin")
                break
            case "CAFE_OWNER":
            case "MANAGER":
                router.push("/dashboard")
                break
            case "CASHIER":
                router.push("/pos")
                break
            case "CHEF":
                router.push("/kitchen")
                break
            case "AFFILIATE":
                router.push("/affiliate")
                break
            case "CUSTOMER":
                router.push("/loyalty")
                break
            default:
                router.push("/")
        }
    }

    const logout = () => {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
        setUser(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
