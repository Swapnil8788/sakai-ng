import { HttpInterceptorFn } from "@angular/common/http";
import { getTokenExpiry, isTokenExpired } from "../Utils/helper";
import { Auth } from "./auth";
import { inject } from "@angular/core";
import { switchMap } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Auth);
    const token = localStorage.getItem('accessToken');
    const offset = 1000* 60 * 5;

    if (!token) {
        return next(req);
    }
    if (req.url.includes('/refresh')) {
            return next(req);
        }

    const expiry = getTokenExpiry(token) || 0;

    // Token about to expire → refresh first
    if (expiry - Date.now() < offset) {
        console.log('Token is about to expire, refreshing...');

     
        const refreshToken = localStorage.getItem('refreshToken') || '';
        return auth.refreshToken({ accessToken: token, refreshToken: refreshToken }).pipe(
            switchMap((res) => {
                const newToken = res.accessToken;
             

                localStorage.setItem('accessToken', newToken);
                localStorage.setItem('refreshToken', res.refreshToken);

                const clonedReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                });

                return next(clonedReq);
            })
        );
    }

    // Token still valid → proceed normally
    const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedReq);
};