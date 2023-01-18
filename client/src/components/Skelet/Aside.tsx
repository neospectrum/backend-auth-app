import React, { FC, AllHTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteNames } from '../../routes/routes';

interface AsideProps extends AllHTMLAttributes<HTMLDivElement> {}

export const Aside: FC<AsideProps> = ({ ...props }) => {
    return (
        <aside>
            <NavLink to={RouteNames.PROFILE_ROUTE}>Profile</NavLink>
            <NavLink to={RouteNames.MESSAGE_ROUTE}>Messages</NavLink>
            <NavLink to={RouteNames.FRIEND_ROUTE}>Friends</NavLink>
            <NavLink to={RouteNames.MATERIAL_ROUTE}>Materials</NavLink>
            <NavLink to={RouteNames.SERVICE_ROUTE}>Services</NavLink>
            <NavLink to={RouteNames.FAVORITE_ROUTE}>Favorites</NavLink>
            <NavLink to={RouteNames.SETTINGS_ROUTE}>Settings</NavLink>
        </aside>
    );
};
