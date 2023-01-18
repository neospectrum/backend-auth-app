import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ name, ...props }) => {
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <input
                name={name}
                {...props}
            />
        </>
    );
};
