import React, { AllHTMLAttributes, FC } from 'react';

interface LayoutProps extends AllHTMLAttributes<HTMLDivElement> {}

export const Layout: FC<LayoutProps> = ({ children, ...props }) => {
    return (
        <div
            className='layout container'
            {...props}
        >
            {children}
        </div>
    );
};
