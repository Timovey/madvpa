import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
// import { User } from './User';
import { Expose, Type } from 'class-transformer';
import { BaseEntity } from './BaseEntity';

export enum BMITypeEnum {
	Unknown = 0,
	Low = 1,
	Normal = 2,
	High = 3
}

export enum AgeTypeEnum {
	Unknown = 0,
	Young = 1,
	Normal = 2,
	Senior = 3,
	Old = 4
}

@Entity()
export class Rule extends BaseEntity {
	@Expose()
	@PrimaryGeneratedColumn()
	id!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: BMITypeEnum,
		default: BMITypeEnum.Unknown
	})
	bmi!: BMITypeEnum;

	@Expose()
	@Column({
		type: 'enum',
		enum: AgeTypeEnum,
		default: AgeTypeEnum.Unknown
	})
	age!: AgeTypeEnum;

	@Expose()
	@Column({})
	norm!: number;

	@Expose()
	@Column({})
	stretchCount!: number;

	@Expose()
	@Column({})
	powerCount!: number;

	@Expose()
	@Column({})
	cardioCount!: number;

	@Expose()
	@Column({})
	comboCount!: number;

	// @Type(() => User)
	// @Expose()
	// @OneToMany(() => User, (user) => user.department)
	// users!: User[];

	// @Type(() => User)
	// @Expose()
	// @OneToOne(() => User)
	// head?: User;
}
