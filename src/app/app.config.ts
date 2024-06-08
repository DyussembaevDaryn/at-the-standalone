import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {API_URL} from "../injectionTokens/injectionTokens";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    [provideRouter(routes), provideClientHydration()],
    [provideHttpClient()],
    [{provide: API_URL, useValue: 'https://jsonplaceholder.typicode.com/users'}], provideAnimationsAsync()
  ],
};
