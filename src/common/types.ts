import { NextFunction, Request, Response, Router } from 'express';

type Handler = (
	request: Request,
	response: Response,
	next: NextFunction
) => Promise<void>;

interface Route {
	path: string;
	method: 'get' | 'post' | 'patch' | 'put' | 'delete';
	action: Handler;
}

interface Controller {
	(): {
		basePath: string;
		methods: Route[];
	};
}
type Service = {
	(): {
		[key: string]: Handler;
	};
};

interface InitRoutesTypes {
	(): Router;
}

export { Controller, Route, Handler, Service, InitRoutesTypes };
