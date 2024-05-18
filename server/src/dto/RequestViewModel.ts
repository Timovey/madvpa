import { Expose, Transform } from 'class-transformer';
import 'reflect-metadata';

export class RequestViewModel {
	@Expose()
	age!: number;

	@Expose()
	height!: number;

	@Expose()
	weight!: number;
}
