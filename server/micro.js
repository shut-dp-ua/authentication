"use strict";

const HTTP_PORT = 3000;

let csrf;
let clients = {};

require('http').createServer((req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	switch(req.url) {
		case '/api/csrf':
			csrf = Math.random();
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({"data": csrf}));
			break;

		case '/api/login':
			if (req.method === 'GET') {
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.end('404 page not found');
			} else if (req.method === 'OPTIONS') {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('OK');
			} else if (req.method === 'POST') {
				let client;

				req.on('data', function (data) {
					client = JSON.parse(data.toString());
					client.email = (client.email).toLowerCase();
				});

				req.on('end', function () {
					res.writeHead(200, {'Content-Type': 'application/json'});
					let response = {};

					try {
						if (csrf !== client.csrf ) {
							response = {
								status: 'csrf',
								data: "Данные отправлены не с оригинальной формы"
							};
						} else if (clients[client.email].password === client.password) {
							response = {
								status: 200,
								data: {
									email: client.email,
									group: clients[client.email]['group']
								}
							};
						} else {
							response = {
								status: 'password',
								data: "Вы ввели неверный пароль"
							};
						}
					} catch (e) {
						console.log(e);

						response = {
							status: 'email',
							data: "Такого пользователя не существует"
						};
					}

					res.end(JSON.stringify(response));
				});
			}
			break;

		case '/api/registration':
			if (req.method === 'GET') {
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.end('404 page not found');
			} else if (req.method === 'OPTIONS') {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('OK');
			} else if (req.method === 'POST') {
				let client;

				req.on('data', function (data) {
					client = JSON.parse(data.toString());
					client.email = (client.email).toLowerCase();
				});

				req.on('end', function () {
					res.writeHead(200, {'Content-Type': 'application/json'});
					let response = {};

					if (clients[client.email]) {
						response = {
							status: 'email',
							data: "Такой пользователь уже существует"
						};
					} else {
						clients[client.email] = {
							password: client.password,
							group: 0
						};

						response = {
							status: 200,
							data: {
								email: client.email,
								group: clients[client.email]['group']
							}
						};
					}

					res.end(JSON.stringify(response));
				});
			}
			break;

		default:
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end('404 page not found');
	}

}).listen(HTTP_PORT, () => console.log(`HTTP сервер запущен по адресу: localhost:${HTTP_PORT}`));