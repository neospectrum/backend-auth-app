import React, { HTMLAttributes, FC } from 'react';

interface MainProps extends HTMLAttributes<HTMLDivElement> {}

export const Main: FC<MainProps> = ({ children, ...props }) => {
    return <main {...props}>{children}</main>;
};
