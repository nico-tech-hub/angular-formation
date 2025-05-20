import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true; // accès autorisé
  }

  return router.createUrlTree(['/login']); // redirection vers /login
};

export const authChildGuard: CanActivateChildFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true; // accès autorisé
  }

  return router.createUrlTree(['/login']); // redirection vers /login
};

// createUrlTree() rend la redirection réactive et contrôlée par le RouteResolver
// Pas de navigation "effet de bord" dans le guard
// Angular Router attend un boolean ou un UrlTree pour CanActivateFn, CanMatch, etc.