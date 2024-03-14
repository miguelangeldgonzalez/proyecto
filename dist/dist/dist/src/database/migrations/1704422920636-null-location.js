"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullLocation1704422920636 = void 0;
class NullLocation1704422920636 {
    constructor() {
        this.name = 'NullLocation1704422920636';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "location_url" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "location_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "description" SET NOT NULL`);
    }
}
exports.NullLocation1704422920636 = NullLocation1704422920636;
//# sourceMappingURL=1704422920636-null-location.js.map