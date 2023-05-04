import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import config from '../../config';
import Preloader from '../Preloader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loaderUser } from '../../redux/apiRequests';

function PrivateRoute() {
    const dispatch = useDispatch();
    useEffect(() => {
        loaderUser(dispatch);
    }, [dispatch]);
    const authLoading = useSelector((state) => state.auth.authLoading);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (authLoading) {
        return <Preloader />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={config.routes.login} />;
}

export default PrivateRoute;
