import BaseEntity from './BaseEntity';
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('user')
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(({ type: 'varchar', length: 50 }))
    firstName: string;

    @Column({ type: 'varchar', length: 50 })
    lastName: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

}
