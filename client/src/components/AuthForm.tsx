import React from 'react';
import { Formik } from 'formik';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { Input } from './UI/Input';
import { Loader } from './UI/Loader';

import { RouteNames } from '../routes/routes';
import { useActions } from '../hooks/useActions';
import { useRegistrationMutation, useLoginMutation } from '../services/user';

interface IErrors {
    email?: string;
    password?: string;
}

export const AuthForm = () => {
    const { signIn } = useActions();

    const location = useLocation();
    const navigate = useNavigate();

    const [register, { error: registrationError }] = useRegistrationMutation();
    const [login, { error: loginError }] = useLoginMutation();

    const isLogin = RouteNames.LOGIN_ROUTE === location.pathname;

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
                const errors: IErrors = {};
                if (!values.email) {
                    errors.email = 'Введите почту';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) &&
                    !isLogin
                ) {
                    errors.email = 'Это не почта!';
                } else if (!values.password) {
                    errors.password = 'Введите пароль';
                } else if (
                    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password) &&
                    !isLogin
                ) {
                    errors.password = 'Сделайте пароль сложным';
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    let user;
                    if (isLogin) {
                        const result = await login({
                            email: values.email,
                            password: values.password,
                        }).unwrap();
                        user = result;
                    } else {
                        const result = await register({
                            email: values.email,
                            password: values.password,
                        }).unwrap();
                        if (!result) {
                            return;
                        }
                        user = result;
                    }
                    signIn(user);
                    setSubmitting(false);
                    navigate('/');
                } catch (error) {}
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className='form-title'>{isLogin ? <>Login</> : <>Register</>}</div>
                    <Input
                        type='email'
                        name='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <Input
                        type='password'
                        name='password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <div className='errors'>
                        {errors.password && touched.password && errors.password}
                        {errors.email && touched.email && errors.email}
                    </div>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader /> : <></>}
                        Submit
                    </button>
                    {isLogin ? (
                        <>
                            {' '}
                            <span>
                                Haven't account?{' '}
                                <NavLink to={RouteNames.REGISTRATION_ROUTE}>Register</NavLink>
                            </span>
                        </>
                    ) : (
                        <>
                            <span>
                                Have an account?{' '}
                                <NavLink to={RouteNames.LOGIN_ROUTE}>Login</NavLink>
                            </span>
                        </>
                    )}
                    <div className='errors'>
                        <>{registrationError}</>
                        <>{loginError}</>
                    </div>
                </form>
            )}
        </Formik>
    );
};
