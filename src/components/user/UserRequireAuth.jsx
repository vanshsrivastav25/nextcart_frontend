import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/UserAuth";

export const UserRequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/account/login" replace />;
    }

    return children;
};
