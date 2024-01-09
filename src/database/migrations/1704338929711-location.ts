import { MigrationInterface, QueryRunner } from "typeorm";

export class Location1704338929711 implements MigrationInterface {
    name = 'Location1704338929711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "title" character varying(30) NOT NULL, "description" character varying NOT NULL, "location_url" character varying NOT NULL, "borough_id" integer, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id")); COMMENT ON COLUMN "location"."location_url" IS 'URL google map location'`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_a2c0b4fafc48c6de094197feed7" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_a2c0b4fafc48c6de094197feed7"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
