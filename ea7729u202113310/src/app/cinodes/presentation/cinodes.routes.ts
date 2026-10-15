import { Routes } from '@angular/router';
import { NewRepositoryManifest } from './views/new-repository-manifest/new-repository-manifest';

/**
 * @summary Child routes of the cinodes bounded context.
 * @author Roberto Gonzales Ayala
 */
export const cinodesRoutes: Routes = [
  { path: 'manifests/new', component: NewRepositoryManifest, title: 'New Repository Manifest' }
];
