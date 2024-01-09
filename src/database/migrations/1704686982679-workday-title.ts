import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkdayTitle1704686982679 implements MigrationInterface {
    name = 'WorkdayTitle1704686982679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday_location" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP CONSTRAINT "FK_267f3899066d32a863075c2bf19"`);
        await queryRunner.query(`ALTER TABLE "workday_location" ALTER COLUMN "borough_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD CONSTRAINT "FK_267f3899066d32a863075c2bf19" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday_location" DROP CONSTRAINT "FK_267f3899066d32a863075c2bf19"`);
        await queryRunner.query(`ALTER TABLE "workday_location" ALTER COLUMN "borough_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD CONSTRAINT "FK_267f3899066d32a863075c2bf19" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP COLUMN "title"`);
    }

}
