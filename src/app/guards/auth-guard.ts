import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectUserEmail } from '../store/user/user.selector';
import { Store } from '@ngrx/store';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  const token = localStorage.getItem('accessToken');
  const email$ = store.select(selectUserEmail);

  if (!token || !email$) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
