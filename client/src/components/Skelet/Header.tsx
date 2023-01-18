import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { RouteNames } from '../../routes/routes';
import { useLogoutMutation } from '../../services/user';

export const Header = () => {
    const { logOut } = useActions();
    const [logOutServer] = useLogoutMutation();

    const exit = () => {
        logOutServer('');
        logOut();
    };

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__body'>
                    <ul className='header__list'>
                        <li>
                            <NavLink
                                to={RouteNames.LOGIN_ROUTE}
                                onClick={() => exit()}
                                style={{ color: 'white' }}
                            >
                                Log out
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
