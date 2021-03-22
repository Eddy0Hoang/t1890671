import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 20 })
    username: string

    @Column({
        unique: true,
        length: 20
    })
    account: string

    @Column({ length: 20 })
    password: string

    @Column({
        type: 'char',
        default: '0'
    })
    gender: '0'|'1'

    @Column({ type: 'tinyint', default: 0 })
    age: number

    @Column({ type: 'varchar', length: 50, default: '' })
    habits: string|string[]
}