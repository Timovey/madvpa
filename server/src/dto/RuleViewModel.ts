import { Expose, Transform } from 'class-transformer';
import 'reflect-metadata';

export class RuleViewModel {
	@Expose()
	bmi!: string;

	@Expose()
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
