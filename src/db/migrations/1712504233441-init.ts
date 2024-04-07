import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712504233441 implements MigrationInterface {
    name = 'Init1712504233441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."rule_gender_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."rule_season_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "rule" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "minAge" integer, "maxAge" integer, "minHeight" integer, "maxHeight" integer, "minWeight" integer, "maxWeight" integer, "gender" "public"."rule_gender_enum" NOT NULL DEFAULT '0', "season" "public"."rule_season_enum" NOT NULL DEFAULT '0', CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE ("name"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "rule"`);
        await queryRunner.query(`DROP TYPE "public"."rule_season_enum"`);
        await queryRunner.query(`DROP TYPE "public"."rule_gender_enum"`);
    }

}
