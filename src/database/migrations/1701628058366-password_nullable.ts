import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordNullable1701628058366 implements MigrationInterface {
    name = 'PasswordNullable1701628058366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
