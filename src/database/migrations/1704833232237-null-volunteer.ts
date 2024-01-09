import { MigrationInterface, QueryRunner } from "typeorm";

export class NullVolunteer1704833232237 implements MigrationInterface {
    name = 'NullVolunteer1704833232237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday_volunteer" DROP CONSTRAINT "FK_3230d76c1b839787b4aa8ff0eb4"`);
        await queryRunner.query(`ALTER TABLE "volunteer" DROP CONSTRAINT "FK_704ee93ba0ea97a68346262b72c"`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "has_pet" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "birth_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" DROP CONSTRAINT "UQ_0cd0dae369207b0fc7f884d1924"`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "borough_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" ADD CONSTRAINT "FK_704ee93ba0ea97a68346262b72c" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workday_volunteer" ADD CONSTRAINT "FK_3230d76c1b839787b4aa8ff0eb4" FOREIGN KEY ("volunteer_id") REFERENCES "volunteer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workday_volunteer" DROP CONSTRAINT "FK_3230d76c1b839787b4aa8ff0eb4"`);
        await queryRunner.query(`ALTER TABLE "volunteer" DROP CONSTRAINT "FK_704ee93ba0ea97a68346262b72c"`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "borough_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" ADD CONSTRAINT "UQ_0cd0dae369207b0fc7f884d1924" UNIQUE ("birth_date")`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "birth_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "has_pet" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "volunteer" ADD CONSTRAINT "FK_704ee93ba0ea97a68346262b72c" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workday_volunteer" ADD CONSTRAINT "FK_3230d76c1b839787b4aa8ff0eb4" FOREIGN KEY ("volunteer_id") REFERENCES "volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
