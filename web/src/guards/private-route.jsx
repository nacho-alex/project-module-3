import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/auth.context';
import Navbar from '../components/UI/navbar';

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (user === undefined) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <><Navbar />{children}</>;
}

export default PrivateRoute;