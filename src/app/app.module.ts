import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';

// Guards
import { AuthenticationGuard } from './_guards/authentication.guard';

// Services
import { AuthenticationService } from './_services/authentication.service';

@NgModule({
	declarations: [
		AppComponent,
		AuthenticationComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpModule,
		AppRoutingModule,
	],
	providers: [
		AuthenticationGuard,
		AuthenticationService,
	],
	bootstrap: [AppComponent],
})

export class AppModule {
}