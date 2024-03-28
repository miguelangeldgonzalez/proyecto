import { MigrationInterface, QueryRunner } from "typeorm";

export class DateType1711375680449 implements MigrationInterface {
    name = 'DateType1711375680449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.volunteer ALTER COLUMN birth_date TYPE date USING birth_date::date::date;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> { }

}
