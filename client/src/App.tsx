import './App.scss';
import React, { useEffect } from 'react';
import { Router } from './components/Router';
import { useLazyRefreshQuery } from './services/user';
import { useActions } from './hooks/useActions';

export const App = () => {
    const [refresh, { data }] = useLazyRefreshQuery();
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
    return <Router />;
};
