import { AppDataSource, entities } from '../db/index';
import {
	convertToClass,
	convertToClassMany,
	convertToJson
} from '../helpers/convertHelper';
import 'reflect-metadata';
import { NotFoundError, UnprocessableEntityError } from '../common/error';
import { RequestViewModel } from '../dto/RequestViewModel';
import { GenderTypeEnum, Rule, SeasonTypeEnum } from '../db/entity/Rule';
import { rateWeight } from './types';

async function getRate(payload: RequestViewModel) {
	try {
		const jsonPayload = JSON.parse(JSON.stringify(payload));

		const ruleRep = AppDataSource.getRepository(Rule);
		const rules = await ruleRep.find();
		console.log(payload);

		const rateRules = rules.map((rule) => {
			let rate = 0;

			for (const [key, value] of Object.entries(rule)) {
				if (key.includes('min')) {
					const payloadPropertyStr = key.split('min')[1].toLowerCase() ?? '';
					const payloadProperty: any = jsonPayload[payloadPropertyStr];
					if (!value || (value && payloadProperty && value < payloadProperty)) {
						rate += 1 * rateWeight[payloadPropertyStr];
					} else {
						rate +=
							(1 - Math.abs(value - payloadProperty) / payloadProperty) *
							rateWeight[payloadPropertyStr];
					}
				} else if (key.includes('max')) {
					const payloadPropertyStr = key.split('max')[1].toLowerCase() ?? '';
					const payloadProperty: any = jsonPayload[payloadPropertyStr];
					if (!value || (value && payloadProperty && value > payloadProperty)) {
						rate += 1 * rateWeight[payloadPropertyStr];
					} else {
						rate +=
							(1 - Math.abs(value - payloadProperty) / payloadProperty) *
							rateWeight[payloadPropertyStr];
					}
				} else {
					if (key.includes('gender') && value != GenderTypeEnum.Unknown) {
						rate += +(value === payload['gender']) * rateWeight['gender'];
					} else if (
						key.includes('gender') &&
						value == GenderTypeEnum.Unknown
					) {
						rate += 1 * rateWeight['gender'];
					}

					if (key.includes('season') && value != SeasonTypeEnum.Unknown) {
						rate += +(value === payload['season']) * rateWeight['season'];
					} else if (
						key.includes('season') &&
						value == SeasonTypeEnum.Unknown
					) {
						rate += 1 * rateWeight['season'];
					}
				}
			}
			return { rate, rule };
		});

		console.log(rateRules);

		// return convertToClass(UserDetailViewModel, user);
	} catch (err: any) {
		throw err;
	}
}

export { getRate };
