import { Express, NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import {
	AlreadyExistsError,
	BadRequestError,
	ForbiddenError,
	InternalServerError,
	LockedError,
	NotFoundError,
	UnauthorizeError,
	UnprocessableEntityError,
	ormErrors
} from '../common/error';
export default function (app: Express) {
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		const message = err.message;
		//если ошибка в ORM
		const code = (err as any).code as string;


		if (err instanceof QueryFailedError) {
			return ormErrors[code]
				? ormErrors[code](message, res)
				: ormErrors['default'](message, res);
		}

		const copyErr: any = err;

		if (code == 'ETELEGRAM') {
			return res
				.status(copyErr.response?.statusCode ?? 400)
				.send({ message: 'Ошибка в Telegram' });
		}
		if (err instanceof AlreadyExistsError) {
			return res.status(409).send({ message });
		} else if (err instanceof UnauthorizeError) {
			return res.status(401).send({ message });
		} else if (err instanceof NotFoundError) {
			return res.status(404).send({ message });
		} else if (err instanceof ForbiddenError) {
			return res.status(403).send({ message });
		} else if (err instanceof BadRequestError) {
			return res.status(400).send({ message });
		} else if (err instanceof LockedError) {
			return res.status(423).send({ message });
		} else if (err instanceof InternalServerError) {
			return res.status(500).send({ message });
		} else if (err instanceof UnprocessableEntityError) {
			return res.status(418).send({ message });
		}

		return res.status(418).json({ message });
	});
}
