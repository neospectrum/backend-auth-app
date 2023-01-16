import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { RouteNames } from '../routes/routes';

export const Home = () => {
    const { logOut } = useActions();
    // const { data } = useGetUsersQuery('');
    return (
        <div className='wrapper'>
            <header className='header'>
                <div className='container'>
                    <div className='header__body'>
                        <ul className='header__list'>
                            <li>
                                <NavLink
                                    to={RouteNames.LOGIN_ROUTE}
                                    onClick={() => logOut()}
                                >
                                    Log out
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className='layout container'>
                <aside>
                    <NavLink to={RouteNames.PROFILE_ROUTE}>Profile</NavLink>
                    <NavLink to={RouteNames.MESSAGE_ROUTE}>Messages</NavLink>
                    <NavLink to={RouteNames.FRIEND_ROUTE}>Friends</NavLink>
                    <NavLink to={RouteNames.MATERIAL_ROUTE}>Materials</NavLink>
                    <NavLink to={RouteNames.SERVICE_ROUTE}>Services</NavLink>
                    <NavLink to={RouteNames.FAVORITE_ROUTE}>Favorites</NavLink>
                    <NavLink to={RouteNames.SETTINGS_ROUTE}>Settings</NavLink>
                </aside>
                {/* <main>{data && data.map((user) => <>{JSON.stringify(user)}</>)}</main> */}
            </div>
        </div>
    );
};
