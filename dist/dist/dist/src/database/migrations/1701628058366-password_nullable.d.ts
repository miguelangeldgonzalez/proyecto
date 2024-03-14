import { MigrationInterface, QueryRunner } from "typeorm";
export declare class PasswordNullable1701628058366 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
