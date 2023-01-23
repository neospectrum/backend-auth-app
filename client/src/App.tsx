import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { Router } from './components/Router';
import { Aside } from './components/Skelet/Aside';
import { Header } from './components/Skelet/Header';
import { Layout } from './components/Skelet/Layout';
import { Main } from './components/Skelet/Main';
import { Wrapper } from './components/Skelet/Wrapper';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useLazyRefreshQuery } from './services/user';

export const App = () => {
    const [refresh] = useLazyRefreshQuery();
    const { checkAuth } = useActions();
    const { isAuth } = useTypedSelector((state) => state.user);

    const checkUser = async () => {
        if (localStorage.getItem('token')) {
            const result = await refresh('').unwrap();
            checkAuth(result);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <Wrapper>
            {isAuth ? (
                <>
                    <Header />
                    <Layout>
                        <Aside />
                        <Main>
                            <Router />
                        </Main>
                    </Layout>
                </>
            ) : (
                <Router />
            )}
        </Wrapper>
    );
};
