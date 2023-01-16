import { Formik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useActions } from '../hooks/useActions';
import { RouteNames } from '../routes/routes';
import { useLoginMutation, useRegistrationMutation } from '../services/user';

interface IErrors {
    email?: string;
    password?: string;
}

export const Auth = () => {
    const { signIn } = useActions();

    const location = useLocation();
    const navigate = useNavigate();

    const [register] = useRegistrationMutation();
    const [login] = useLoginMutation();

    const isLogin = RouteNames.LOGIN_ROUTE === location.pathname;

    return (
        <div className='wrapper'>
            <div className='login'>
                <div className='container'>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={(values) => {
                            const errors: IErrors = {};
                            if (!values.email) {
                                errors.email = 'Введите почту';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Неверная почта';
                            } else if (!values.password) {
                                errors.password = 'Введите пароль';
                            } else if (
                                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password)
                            ) {
                                errors.password = 'Неверный пароль';
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
                                    user = result;
                                }
                                signIn(user);
                                setSubmitting(false);
                                navigate('/');
                            } catch (error) {
                                console.log(error);
                            }
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
                                {isLogin ? <>Sign In</> : <>Register</>}
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
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
