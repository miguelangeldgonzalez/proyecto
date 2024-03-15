import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Collected1710468802009 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
