import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { routerStates } from './app.routing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@Angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withFetch()),
		importProvidersFrom(UIRouterModule.forRoot({ states: routerStates })),
		provideAnimations(),
		provideToastr(),
	],
};
