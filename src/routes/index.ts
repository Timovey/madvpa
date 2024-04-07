import { NextFunction, Request, Response, Router } from 'express';
import allRoutes from '../controllers';
import expressValidationHandler from '../helpers/expressValidationHandler';
import { InitRoutesTypes } from '../common/types';

const initRoutes: InitRoutesTypes = function () {
	const router = Router();

	allRoutes.forEach((controlInit) => {
		const controller = controlInit();

		controller.methods.forEach((method) => {
			router[method.method](
				'/api' + controller.basePath + method.path,
				expressValidationHandler,
				(request: Request, response: Response, next: NextFunction) =>
					method
						.action(request, response, next)
						.then(() => next)
						.catch((err: Error) => {
							next(err);
						})
			);
		});
	});

	return router;
};

export default initRoutes;
