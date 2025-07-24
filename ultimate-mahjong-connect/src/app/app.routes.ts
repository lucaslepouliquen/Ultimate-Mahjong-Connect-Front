import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: AuthComponent
      },
      {
        path: 'callback',
        component: AuthComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'game',
    component: AppComponent  // Board accessible sans authentification
  },
  {
    path: '',
    component: AppComponent  // Page d'accueil = board directement
  },
  {
    path: '**',
    redirectTo: ''  // Rediriger vers le board au lieu de login
  }
];
