import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useActions } from '../hooks/useActions';

interface IErrors {
    email?: string;
    password?: string;
}

export const Auth = () => {
    const navigate = useNavigate();
    const { signIn } = useActions();
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
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                signIn({ email: values.email });
                                navigate('/');
                            }, 400);
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
                            isValid,
                            isValidating,
                        }) => (
                            <form onSubmit={handleSubmit}>
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
