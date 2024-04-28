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
import { getAge, getBMI } from '../../businessLogic/rate';
import { getRule } from '../../businessLogic/predict';
import { RuleViewModel } from '../../dto/RuleViewModel';

const commonService: Service = () => {
	return {
		getRecommend: async (request, response, next) => {
			try {
				const { age, height, weight } = convertToClass(
					RequestViewModel,
					request.body
				);
				const bmiLabel = getBMI(weight, height);
				const ageLabel = getAge(age);

				const rule = await getRule(ageLabel, bmiLabel);
				response.json(convertToJson(RuleViewModel, rule));
			} catch (err) {
				next(err);
			}
		}
	};
};
export default commonService;
