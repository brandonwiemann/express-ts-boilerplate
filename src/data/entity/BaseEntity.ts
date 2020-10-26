import { IBaseEntity } from '@/types/entity.types';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseEntity implements IBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

	@CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}