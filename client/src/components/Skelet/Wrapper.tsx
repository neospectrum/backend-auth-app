import React, { AllHTMLAttributes, FC, ReactNode } from 'react';

interface WrapperProps extends AllHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children, ...props }) => {
    return (
        <div
            className='wrapper'
            {...props}
        >
            {children}
        </div>
    );
};
