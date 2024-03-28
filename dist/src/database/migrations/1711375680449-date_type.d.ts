import { MigrationInterface, QueryRunner } from "typeorm";
export declare class DateType1711375680449 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
