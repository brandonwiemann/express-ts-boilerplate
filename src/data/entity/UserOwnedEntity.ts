import BaseEntity from './BaseEntity';
import User from './User';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { IBaseEntity } from '@/types/entity.types';

export default abstract class UserOwnedEntity implements IBaseEntity {
    @ManyToOne(() => User)
    @JoinColumn()
	public user: User

	@Column()
    public userId: number;
}
