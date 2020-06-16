import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/dashboard/main', title: 'Home', icon: 'fas fa-home', class: 'menu-toggle', groupTitle: false,
        submenu: [
            { path: '/dashboard/main', title: 'Dashboard', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] }
            // { path: '/dashboard/dashboard2', title: 'map', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] }
        ],
    },
    {
        path: '#!', title: 'Manage users', icon: 'fas fa-users-cog', class: 'menu-toggle', groupTitle: false,
        submenu: [
          { path: '/users/users-list', title: 'Users', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
          { path: '/users/agencies', title: 'Agencies', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] }
        ]
    },
];
