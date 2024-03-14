"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEmail1702775086150 = void 0;
class UniqueEmail1702775086150 {
    constructor() {
        this.name = 'UniqueEmail1702775086150';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }
}
exports.UniqueEmail1702775086150 = UniqueEmail1702775086150;
//# sourceMappingURL=1702775086150-unique_email.js.map