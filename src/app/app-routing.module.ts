import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { AuthenticationComponent } from './authentication/authentication.component';

/* Guards */
import { AuthenticationGuard } from './_guards/authentication.guard';

const routes: Routes = [
	{
		path: '',
		children: [],
		canActivate: [AuthenticationGuard],
	}, {
		path: 'login',
		component: AuthenticationComponent,
	}, {
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthenticationGuard],
})

export class AppRoutingModule {
}