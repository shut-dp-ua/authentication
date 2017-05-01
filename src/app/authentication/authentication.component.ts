import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

function userValidation(c: AbstractControl) {
	return (!c.get('emailValid').value && !c.get('passwordValid').value) ? null : {nomatch: true};
}

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css'],
	providers: [AuthenticationService],
})

export class AuthenticationComponent implements OnInit {
	loginForm: FormGroup;
	csrf: string;
	emailError: string = null;
	passwordError: string = null;
	formEvent: string = 'login';
	title: string = 'Sign in';
	registered = false;

	constructor(public fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
		this.loginForm = this.fb.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
			emailValid: false,
			passwordValid: false,
		}, {validator: userValidation});
	}

	ngOnInit() {
		this.auth.get_csrf().subscribe(
			req => {
				this.csrf = req.data;
			},
			error => console.error(error),
		);
	}

	resetErrors() {
		this.passwordError = null;
		this.emailError = null;
	}

	changeForm() {
		this.formEvent === 'login' ? this.formEvent = 'registration' : this.formEvent = 'login';
		this.title === 'Sign in' ? this.title = 'Registration' : this.title = 'Sign in';
		this.resetErrors();
		this.loginForm.reset({email: '', password: '', emailValid: false, passwordValid: false});
	}

	submit() {
		let values = this.loginForm.value;
		if (this.formEvent == 'login') {
			values.csrf = this.csrf;

			this.auth.login(values).subscribe(
				req => {
					if (req.status == 200) {
						localStorage.setItem('loginForm', JSON.stringify(req.data));
						this.router.navigate(['']);
					} else if (req.status == 'password') {
						this.resetErrors();
						this.passwordError = req.data;
					} else if (req.status == 'email') {
						this.resetErrors();
						this.emailError = req.data;
					}
				},
				error => console.error(error),
			);
		} else if (this.formEvent == 'registration') {
			this.auth.registration(values).subscribe(
				req => {
					if (req.status == 200) {
						localStorage.setItem('loginForm', JSON.stringify(req.data));
						this.registered = true;
					} else if (req.status == 'email') {
						this.resetErrors();
						this.emailError = req.data;
					}
				},
				error => console.error(error),
			);
		}
	}
}