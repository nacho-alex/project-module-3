import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/auth.context';
import Navbar from '../components/UI/navbar/navbar';
import PageLayout from '../layouts/PageLayout';

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (user === undefined) {
        return null;
    } else if (user === null) {
        return (<Navigate to="/login" />);
    } else {
        return <><Navbar />{children}</>;
    }
}

export default PrivateRoute;