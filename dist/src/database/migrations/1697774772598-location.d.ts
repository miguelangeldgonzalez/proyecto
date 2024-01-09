import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Location1697774772598 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
