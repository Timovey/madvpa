import { Service } from '../../common/types';
import { AppDataSource, entities } from '../../db/index';
import { convertToJson, convertToJsonMany } from '../../helpers/convertHelper';
import 'reflect-metadata';
import { BadRequestError, NotFoundError, UnauthorizeError } from '../../common/error';
import moment from 'moment';

const reqService: Service = () => {
	return {
		getRecommend: async (request, response, next) => {
			try {
				response.json({});
			} catch (err) {
				next(err);
			}
		}
	};
};
export default reqService;
