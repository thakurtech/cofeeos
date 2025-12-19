"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface User {
    id: string
    email: string
    name: string
    role: string
    shopId?: string
}

interface Shop {
    id: string
    name: string
    slug: string
    address?: string
    phone?: string
    logo?: string
    primaryColor?: string
    upiId?: string
    gstNumber?: string
    currency: string
}

interface AuthContextType {
    user: User | null
    shop: Shop | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    loading: boolean
    setShop: (shop: Shop | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [shop, setShop] = useState<Shop | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem("auth_token")
        const storedUser = localStorage.getItem("user_data")
        const storedShop = localStorage.getItem("shop_data")

        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser))
                if (storedShop) {
                    setShop(JSON.parse(storedShop))
                }
            } catch (e) {
                // Invalid stored data, clear it
                localStorage.removeItem("auth_token")
                localStorage.removeItem("user_data")
                localStorage.removeItem("shop_data")
            }
        }
        setLoading(false)
    }, [])

    // Fetch shop data when user has shopId
    useEffect(() => {
        async function fetchShop() {
            if (user?.shopId && !shop) {
                try {
                    const res = await fetch(`${API_URL}/shops/by-id/${user.shopId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                        }
                    })
                    if (res.ok) {
                        const shopData = await res.json()
                        setShop(shopData)
                        localStorage.setItem("shop_data", JSON.stringify(shopData))
                    }
                } catch (e) {
                    console.error("Failed to fetch shop:", e)
                }
            }
        }
        fetchShop()
    }, [user?.shopId, shop])

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Invalid credentials" }))
            throw new Error(error.message || "Invalid credentials")
        }

        const data = await response.json()

        // Store token and user data
        localStorage.setItem("auth_token", data.access_token)
        localStorage.setItem("user_data", JSON.stringify(data.user))
        setUser(data.user)

        // If shop data is included in response, store it
        if (data.shop) {
            localStorage.setItem("shop_data", JSON.stringify(data.shop))
            setShop(data.shop)
        }

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
        localStorage.removeItem("shop_data")
        setUser(null)
        setShop(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, shop, login, logout, loading, setShop }}>
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

// Hook to get current shop (for components that need shop context)
export function useShop() {
    const { shop } = useAuth()
    return shop
}
