import { MigrationInterface, QueryRunner } from "typeorm";

export class NullLocation1704422920636 implements MigrationInterface {
    name = 'NullLocation1704422920636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "location_url" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "location_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "description" SET NOT NULL`);
    }

}
