import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/data/types";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

// Mock user database (localStorage)
const USERS_KEY = "fantasy_users";
const CURRENT_USER_KEY = "fantasy_current_user";

function getUsers(): User[] {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveUsers(users: User[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser(): User | null {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
}

function saveCurrentUser(user: User | null) {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(getCurrentUser);

    useEffect(() => {
        saveCurrentUser(user);
    }, [user]);

    const register = async (email: string, username: string, password: string): Promise<boolean> => {
        const users = getUsers();

        // Check if email already exists
        if (users.some(u => u.email === email)) {
            return false;
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            email,
            username,
            joinedAt: new Date().toISOString(),
            stats: {
                rank: 0,
                totalPoints: 0,
                activeContests: 0,
                pointsThisWeek: 0,
            },
        };

        // Store password separately (in real app, this would be hashed on backend)
        const authData = { email, password };
        const authKey = `auth_${email}`;
        localStorage.setItem(authKey, JSON.stringify(authData));

        users.push(newUser);
        saveUsers(users);
        setUser(newUser);
        return true;
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        const authKey = `auth_${email}`;
        const stored = localStorage.getItem(authKey);

        if (!stored) return false;

        const authData = JSON.parse(stored);
        if (authData.password !== password) return false;

        const users = getUsers();
        const foundUser = users.find(u => u.email === email);

        if (!foundUser) return false;

        setUser(foundUser);
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
