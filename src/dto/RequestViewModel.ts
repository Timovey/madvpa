import { Expose, Transform } from 'class-transformer';
import 'reflect-metadata';
import { GenderTypeEnum, SeasonTypeEnum } from '../db/entity/Rule';

export class RequestViewModel {
	@Expose()
	age!: number;

	@Expose()
	height!: number;

	@Expose()
	weight!: number;

	@Expose()
	gender!: GenderTypeEnum;

	@Expose()
	season!: SeasonTypeEnum;
}
