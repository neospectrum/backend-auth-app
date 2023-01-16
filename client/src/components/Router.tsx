import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes } from '../routes/routes';

export const Router = () => {
    const { isAuth } = useTypedSelector((state) => state.user);

    return (
        <Routes>
            {isAuth
                ? privateRoutes.map((route) => {
                      return (
                          <Route
                              key={route.path}
                              path={route.path}
                              element={<route.element />}
                          />
                      );
                  })
                : publicRoutes.map((route) => {
                      return (
                          <Route
                              key={route.path}
                              path={route.path}
                              element={<route.element />}
                          />
                      );
                  })}
        </Routes>
    );
};
