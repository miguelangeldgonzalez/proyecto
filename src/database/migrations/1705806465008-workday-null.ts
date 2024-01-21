import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkdayNull1705806465008 implements MigrationInterface {
    name = 'WorkdayNull1705806465008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday" DROP CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8"`);
        await queryRunner.query(`ALTER TABLE "workday" ALTER COLUMN "workday_location_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday" ADD CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8" FOREIGN KEY ("workday_location_id") REFERENCES "workday_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday" DROP CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8"`);
        await queryRunner.query(`ALTER TABLE "workday" ALTER COLUMN "workday_location_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday" ADD CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8" FOREIGN KEY ("workday_location_id") REFERENCES "workday_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
