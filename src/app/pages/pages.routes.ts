import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from '../guards/auth-guard';
import { Organisations } from './organisations/organisations';

export default [
    { path: 'pages', component: Dashboard, canActivate: [authGuard] },
    { path: 'organisations', component: Organisations },
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '', component: Dashboard },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
