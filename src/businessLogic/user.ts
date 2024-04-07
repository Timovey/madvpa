import { AppDataSource, entities } from '../db/index';
import { convertToClass, convertToClassMany } from '../helpers/convertHelper';
import 'reflect-metadata';
import { NotFoundError, UnprocessableEntityError } from '../common/error';
import moment from 'moment';
import { Between, IsNull, Not } from 'typeorm';

type OrderType = 'ASC' | 'DESC';

// async function getUserByTgId(id: number): Promise<UserDetailViewModel> {
// 	try {
// 		// const userRep = AppDataSource.getRepository(User);
// 		// if (!id) {
// 		// 	throw new UnprocessableEntityError('Нет Telegram ID');
// 		// }
// 		// const user = await userRep.findOne({
// 		// 	where: {
// 		// 		telegramId: id
// 		// 	}
// 		// });
// 		// if (!user) {
// 		// 	throw new NotFoundError('Нет такого пользователя!');
// 		// }
// 		// return convertToClass(UserDetailViewModel, user);
// 	} catch (err: any) {
// 		throw err;
// 	}
// }

export {};
