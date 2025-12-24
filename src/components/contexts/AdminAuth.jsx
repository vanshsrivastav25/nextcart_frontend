import { createContext, useState } from "react";

export const AdminAuthContext  = createContext();

export const AdminAuthProvider = ({children}) => {
    // Admin info ko localStorage se padho
    const adminInfo = localStorage.getItem('adminInfo')
    const [user, setUser] = useState(adminInfo ? JSON.parse(adminInfo) : null);

    const login = (user) => {
        // User ko stringify karke localStorage mein save karo
        localStorage.setItem('adminInfo', JSON.stringify(user));
        setUser(user)
    }

    const logout = () => {
        // Sahi key use karo (adminInfo)
        localStorage.removeItem('adminInfo');
        setUser(null)
    }

    return <AdminAuthContext.Provider value={{
        user,
        login,
        logout
    }}>
        {children}
    </AdminAuthContext.Provider>
}