import { useEffect } from 'react';
import './App.scss';
import { Router } from './components/Router';
import { Aside } from './components/Skelet/Aside';
import { Header } from './components/Skelet/Header';
import { Layout } from './components/Skelet/Layout';
import { Main } from './components/Skelet/Main';
import { Wrapper } from './components/Skelet/Wrapper';
import { useActions } from './hooks/useActions';
import { useLazyRefreshQuery } from './services/user';

export const App = () => {
    const [refresh] = useLazyRefreshQuery();
    const { checkAuth } = useActions();

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
            <Header />
            <Layout>
                <Aside />
                <Main>
                    <Router />
                </Main>
            </Layout>
        </Wrapper>
    );
};
