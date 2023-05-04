import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { privateRoutes, publicRoutes } from './routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loaderUser } from './redux/apiRequests';
import socket from './config/socket';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        loaderUser(dispatch);
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);
    //

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route element={<PrivateRoute />}>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
