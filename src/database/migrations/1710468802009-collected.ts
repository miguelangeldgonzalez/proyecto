import { MigrationInterface, QueryRunner } from "typeorm";

export class Collected1710468802009 implements MigrationInterface {
    name = 'Collected1710468802009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday" ADD "total_collected" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday" DROP COLUMN "total_collected"`);
    }

}
