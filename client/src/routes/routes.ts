import { Favorites } from './../pages/Favorites';
import { Services } from './../pages/Services';
import { Friends } from '../pages/Friends';
import { Materials } from '../pages/Materials';
import { Messages } from '../pages/Messages';
import { Profile } from '../pages/Profile';
import { Settings } from '../pages/Settings';
import { Auth } from '../pages/Auth';
import { Home } from '../pages/Home';

interface IRoute {
    path: string;
    element: React.FC;
}

export enum RouteNames {
    HOME_ROUTE = '/',
    PROFILE_ROUTE = '/profile',
    MESSAGE_ROUTE = '/messages',
    FRIEND_ROUTE = '/friends',
    MATERIAL_ROUTE = '/materials',
    SERVICE_ROUTE = '/services',
    FAVORITE_ROUTE = '/favorites',
    SETTINGS_ROUTE = '/settings',
    LOGIN_ROUTE = '/login',
    REGISTRATION_ROUTE = '/registration',
}
export const publicRoutes: IRoute[] = [
    // { path: RouteNames.HOME_ROUTE, element: Home },
    { path: RouteNames.LOGIN_ROUTE, element: Auth },
    { path: RouteNames.REGISTRATION_ROUTE, element: Auth },
];



export const privateRoutes: IRoute[] = [
    { path: RouteNames.HOME_ROUTE, element: Home },
    { path: RouteNames.PROFILE_ROUTE, element: Profile },
    { path: RouteNames.MESSAGE_ROUTE, element: Messages },
    { path: RouteNames.FRIEND_ROUTE, element: Friends },
    { path: RouteNames.MATERIAL_ROUTE, element: Materials },
    { path: RouteNames.SERVICE_ROUTE, element: Services },
    { path: RouteNames.SETTINGS_ROUTE, element: Settings },
    { path: RouteNames.FAVORITE_ROUTE, element: Favorites },
];
