import { Service } from '../../common/types';
import { AppDataSource, entities } from '../../db/index';
import {
	convertToClass,
	convertToJson,
	convertToJsonMany
} from '../../helpers/convertHelper';
import 'reflect-metadata';
import { BadRequestError, NotFoundError, UnauthorizeError } from '../../common/error';
import moment from 'moment';
import { RequestViewModel } from '../../dto';
import { getRate } from '../../businessLogic/rate';

const commonService: Service = () => {
	return {
		getRecommend: async (request, response, next) => {
			try {
				const payload = convertToClass(RequestViewModel, request.body);
				// console.log(payload);

				getRate(payload);
				response.json({});
			} catch (err) {
				next(err);
			}
		}
	};
};
export default commonService;
