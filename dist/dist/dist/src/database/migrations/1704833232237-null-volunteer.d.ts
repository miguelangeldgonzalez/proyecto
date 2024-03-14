import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NullVolunteer1704833232237 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
