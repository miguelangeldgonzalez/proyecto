import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimeStamps {
    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp',
        name: 'deleted_at',
        nullable: true,
    })
    deletedAt?: Date;
}