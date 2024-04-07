import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import initRoutes from './routes/index';
import useErrorHandler from './helpers/errorHandler';
import AppDataSource from './db/dataSource';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app_port = Number(process.env.PORT ?? 8002);

async function start() {
	try {
		const app = express();

		//соединение с БД
		await AppDataSource.initialize();

		//подключаем CORS
		app.use(
			cors({
				origin: true,
				preflightContinue: true,
				credentials: true
			})
		);

		// app.options('*', cors());

		//конфигурация тела запроса
		app.use(bodyParser.json({ limit: '50mb' }));
		app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

		//подключаем парсер cookie
		app.use(cookieParser());

		//создаем http(s) сервер
		const server = http.createServer({}, app);

		//создаем логгер
		//подключаем роуты
		app.use(initRoutes());

		//подключаем статику для авторизированных пользователей
		app.use('/static', express.static(process.cwd() + '/static'));
		app.use('/temp', express.static(process.cwd() + '/temp'));

		useErrorHandler(app);

		const app_host = process.env.HOST ?? 'localhost';
		const listen_callback = () =>
			console.log(`🚀 App listening at http://${app_host}:${app_port}`);

		app_host === 'localhost'
			? server.listen(app_port, listen_callback)
			: server.listen(app_port, app_host, listen_callback);
	} catch (error: any) {
		console.log('О нет', error);
	}
}

start();
