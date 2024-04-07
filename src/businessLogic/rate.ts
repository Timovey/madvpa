import { AppDataSource, entities } from '../db/index';
import {
	convertToClass,
	convertToClassMany,
	convertToJson
} from '../helpers/convertHelper';
import 'reflect-metadata';
import { NotFoundError, UnprocessableEntityError } from '../common/error';
import moment from 'moment';
import { Between, IsNull, Not } from 'typeorm';
import { RequestViewModel } from '../dto/RequestViewModel';
import { Rule } from '../db/entity/Rule';

const bodyRate = 1;
const genderRate = 0.8;
const seasonRate = 0.5;

async function getRate(payload: RequestViewModel) {
	try {
		const jsonPayload = JSON.parse(JSON.stringify(payload));

		const ruleRep = AppDataSource.getRepository(Rule);
		const rules = await ruleRep.find();
		const rateRules = rules.map((rule) => {
			let rate = 0;

			for (const [key, value] of Object.entries(rule)) {
				// console.log(`${key}: ${value}`);
				const objKeys = Object.keys(payload);
				if (key.includes('min')) {
					const payloadProperty: any =
						jsonPayload[key.split('min')[1].toLowerCase() ?? ''];
					if (!value || (value && payloadProperty && value < payloadProperty)) {
						rate += 1;
					} else {
						rate += 1 - Math.abs(value - payloadProperty) / payloadProperty;
					}
				} else if (key.includes('max')) {
					const payloadProperty: any =
						jsonPayload[key.split('max')[1].toLowerCase() ?? ''];
					if (!value || (value && payloadProperty && value > payloadProperty)) {
						rate += 1;
					} else {
						rate += 1 - Math.abs(value - payloadProperty) / payloadProperty;
					}
				} else {
					if (key.includes('gender')) {
						console.log(key);
					} else if (key.includes('season')) {
						console.log(key);
					}
				}
			}

			console.log(rate);

			// if (!rule.maxAge || (rule.maxAge && rule.maxAge > payload.age)) {
			// 	rate += 1;
			// } else {
			// 	rate += 1 - Math.abs(rule.maxAge - payload.age) / payload.age;
			// }
			return 0;
		});

		// return convertToClass(UserDetailViewModel, user);
	} catch (err: any) {
		throw err;
	}
}

export { getRate };
