import { AppDataSource, entities } from '../db/index';
import { convertToClass } from '../helpers/convertHelper';
import 'reflect-metadata';
import { RequestViewModel } from '../dto/RequestViewModel';
import { AgeTypeEnum, BMITypeEnum, Rule } from '../db/entity/Rule';
import { RuleViewModel } from '../dto/RuleViewModel';
import { rateWeight } from './types';

async function getRate(payload: RequestViewModel) {
	try {
		const jsonPayload = JSON.parse(JSON.stringify(payload));

		const ruleRep = AppDataSource.getRepository(Rule);
		const rules = await ruleRep.find();

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
				}
			}
			return { rate, rule };
		});

		return rateRules;
	} catch (err: any) {
		throw err;
	}
}

type RateRule = {
	rule: Rule;
	rate: number;
};
function sortRule(a: RateRule, b: RateRule) {
	if (a.rate < b.rate) return -1;
	if (a.rate > b.rate) return 1;
	return 0;
}
async function getRule2(age: AgeTypeEnum, bmi: BMITypeEnum) {
	const ruleRep = AppDataSource.getRepository(Rule);
	const rules = await ruleRep.find({});
	const ratedRules: RateRule[] = rules.map((rule) => {
		let rateBmi = rateWeight.bmi * Math.abs(+rule.bmi - +bmi);
		let rateAge = rateWeight.age * Math.abs(+rule.age - +age);

		return {
			rate: rateBmi + rateAge,
			rule
		};
	});
	const sortedRules = ratedRules.sort(sortRule);

	return convertToClass(RuleViewModel, sortedRules[0].rule);
}

async function getRule(age: AgeTypeEnum, bmi: BMITypeEnum) {
	const ruleRep = AppDataSource.getRepository(Rule);
	const rule = await ruleRep.findOne({
		where: {
			age: age,
			bmi: bmi
		}
	});
	return convertToClass(RuleViewModel, rule);
}

export { getRule, getRate, getRule2 };
