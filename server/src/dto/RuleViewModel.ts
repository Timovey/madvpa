import { Expose, Transform } from 'class-transformer';
import 'reflect-metadata';
import { AgeTypeEnum, BMITypeEnum } from '../db/entity/Rule';

export class RuleViewModel {
	@Expose()
	@Transform((value) => convertBMI(value.value))
	bmi!: string;

	@Expose()
	@Transform((status) => convertAge(status.value))
	age!: string;

	@Expose()
	norm!: number;

	@Expose()
	stretchCount!: number;

	@Expose()
	powerCount!: number;

	@Expose()
	cardioCount!: number;

	@Expose()
	comboCount!: number;
}

function convertBMI(type: any): string {
	return BMITypeEnum[+type] ?? type + '';
}
function convertAge(type: any): string {
	return AgeTypeEnum[+type] ?? type + '';
}
