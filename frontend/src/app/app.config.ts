import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authHttpInterceptorFn, provideAuth0} from "@auth0/auth0-angular";
import {environment as env} from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor
      },
      cacheLocation: "localstorage"
    })
  ]
};
