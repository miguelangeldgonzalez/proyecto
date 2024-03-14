"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location1704338929711 = void 0;
class Location1704338929711 {
    constructor() {
        this.name = 'Location1704338929711';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "title" character varying(30) NOT NULL, "description" character varying NOT NULL, "location_url" character varying NOT NULL, "borough_id" integer, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id")); COMMENT ON COLUMN "location"."location_url" IS 'URL google map location'`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_a2c0b4fafc48c6de094197feed7" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_a2c0b4fafc48c6de094197feed7"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }
}
exports.Location1704338929711 = Location1704338929711;
//# sourceMappingURL=1704338929711-location.js.map