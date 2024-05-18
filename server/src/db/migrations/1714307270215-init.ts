import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1714307270215 implements MigrationInterface {
    name = 'Init1714307270215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."rule_bmi_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TYPE "public"."rule_age_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "rule" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "bmi" "public"."rule_bmi_enum" NOT NULL DEFAULT '0', "age" "public"."rule_age_enum" NOT NULL DEFAULT '0', "norm" integer NOT NULL, "stretchCount" integer NOT NULL, "powerCount" integer NOT NULL, "cardioCount" integer NOT NULL, "comboCount" integer NOT NULL, CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rule"`);
        await queryRunner.query(`DROP TYPE "public"."rule_age_enum"`);
        await queryRunner.query(`DROP TYPE "public"."rule_bmi_enum"`);
    }

}
