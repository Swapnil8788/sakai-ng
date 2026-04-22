import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // Auto logout if 401 response returned from api
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // this.store.dispatch
      }
      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    }
    )
  );
};
