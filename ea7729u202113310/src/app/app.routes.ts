import { Routes } from '@angular/router';
import { cinodesRoutes } from './cinodes/presentation/cinodes.routes';
import { Home } from './shared/presentation/views/home/home';
import { PageNotFound } from './shared/presentation/views/page-not-found/page-not-found';

/**
 * @summary Root routes: home, child routes of the cinodes bounded context, root redirect and wildcard.
 * @author Roberto Gonzales Ayala
 */
export const routes: Routes = [
  { path: 'home', component: Home, title: 'Home' },
  { path: 'repositories', children: cinodesRoutes },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: 'Page not found' }
];
