import { BadRequestError } from '../common/error';
import { AgeTypeEnum, BMITypeEnum } from '../db/entity/Rule';

function getBMI(weight: number, height: number): BMITypeEnum {
	const meterHeight = height / 100;
	const bmi = weight / (meterHeight * meterHeight);
	if (bmi < 18.5) {
		return BMITypeEnum.Low;
	} else if (bmi >= 18.5 && bmi < 25) {
		return BMITypeEnum.Normal;
	} else {
		return BMITypeEnum.High;
	}
}

function getAge(age: number): AgeTypeEnum {
	if (age < 18) {
		throw new BadRequestError(
			'Вы слишком молоды, мы не можем для Вас подобрать рекомендацию!'
		);
	}
	if (age >= 18 && age <= 30) {
		return AgeTypeEnum.Young;
	} else if (age > 30 && age <= 45) {
		return AgeTypeEnum.Normal;
	} else if (age > 45 && age < 60) {
		return AgeTypeEnum.Senior;
	} else {
		return AgeTypeEnum.Old;
	}
}

export { getBMI, getAge };
