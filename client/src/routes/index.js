import config from '../config';
import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile/Profile';

//public routes
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
];

//private routes
const privateRoutes = [
    { path: config.routes.home, component: Home, layout: MainLayout },
    { path: config.routes.profile, component: Profile, layout: MainLayout },
];

export { publicRoutes, privateRoutes };
