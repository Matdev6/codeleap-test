"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type User = {
    username: string
}

type UsernameContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined)

type UsernameProviderProps = {
    children: ReactNode
}

export function UsernameProvider({ children }: UsernameProviderProps) {

    const [user, setUser] = useState<User | null>(null)

    return (
        <UsernameContext.Provider value={{ user, setUser }}>
            {children}
        </UsernameContext.Provider>
    )
}

export function useUsername() {

    const context = useContext(UsernameContext)

    if (!context) {
        throw new Error("useUsername must be used inside UsernameProvider")
    }

    return context
}