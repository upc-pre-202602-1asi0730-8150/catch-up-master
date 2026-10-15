import { Component } from '@angular/core';
import { Layout } from './shared/presentation/components/layout/layout';

/**
 * @summary Root component of the application. Renders the main layout.
 * @author Roberto Gonzales Ayala
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
