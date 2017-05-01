import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
	url = 'http://localhost:3000';

	constructor(private http: Http) {
	}

	get_csrf(): Observable<any> {
		return this.http.get(this.url + '/api/csrf')
			.map(this.extractData)
			.catch(this.handleError);
	}

	login(values): Observable<any> {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(values);

		return this.http.post(this.url + '/api/login', body, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	registration(values): Observable<any> {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(values);

		return this.http.post(this.url + '/api/registration', body, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		try {
			return res.json();
		} catch (e) {
			return res.text();
		}
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

		console.error('ERR: ' + errMsg);
		return Observable.throw(error.json(error));
	}
}
