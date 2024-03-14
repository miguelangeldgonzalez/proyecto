import { MigrationInterface, QueryRunner } from "typeorm";
export declare class WorkdayNull1705806465008 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
