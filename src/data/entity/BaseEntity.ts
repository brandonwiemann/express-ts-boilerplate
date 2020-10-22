import { IBaseEntity } from '@/types/entity.types';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseEntity implements IBaseEntity {
	@CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}