import { createContext, useState, useContext } from "react";
import { Navigate } from "react-router-dom";

// Auth Context
export const AuthContext  = createContext();

export const AuthProvider = ({children}) => {
    const userInfo = localStorage.getItem('userInfo')
    const [user, setUser] = useState(userInfo);

    const login = (user) => {
        setUser(user)
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Route protection component
export const UserRequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Redirect to login if not logged in
        return <Navigate to="/account/login" replace />;
    }

    return children;
};
