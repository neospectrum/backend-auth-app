import React, { AllHTMLAttributes, FC } from 'react';

interface ContainerProps extends AllHTMLAttributes<HTMLDivElement> {}

export const Container: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <div
            className='container'
            {...props}
        >
            {children}
        </div>
    );
};
