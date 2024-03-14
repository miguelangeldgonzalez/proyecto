import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Workday1698114665384 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
