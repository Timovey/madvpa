import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
// import { User } from './User';
import { Expose, Type } from 'class-transformer';
import { BaseEntity } from './BaseEntity';

enum GenderTypeEnum {
	Unknown,
	Man,
	Wooman,
	No
}

enum SeasonTypeEnum {
	Unknown,
	Cold,
	Warm
}

@Entity()
export class Rule extends BaseEntity {
	@Expose()
	@PrimaryGeneratedColumn()
	id!: number;

	@Expose()
	@Column({
		nullable: true
	})
	minAge?: number;

	@Expose()
	@Column({
		nullable: true
	})
	maxAge?: number;

	@Expose()
	@Column({
		nullable: true
	})
	minHeight?: number;

	@Expose()
	@Column({
		nullable: true
	})
	maxHeight?: number;

	@Expose()
	@Column({
		nullable: true
	})
	minWeight?: number;

	@Expose()
	@Column({
		nullable: true
	})
	maxWeight?: number;

	@Expose()
	@Column({
		type: 'enum',
		default: GenderTypeEnum.Unknown
	})
	gender!: GenderTypeEnum;

	@Expose()
	@Column({
		type: 'enum',
		default: SeasonTypeEnum.Unknown
	})
	season!: SeasonTypeEnum;

	// @Type(() => User)
	// @Expose()
	// @OneToMany(() => User, (user) => user.department)
	// users!: User[];

	// @Type(() => User)
	// @Expose()
	// @OneToOne(() => User)
	// head?: User;
}
