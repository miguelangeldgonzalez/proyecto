import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Location1704338929711 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
