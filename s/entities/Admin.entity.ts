import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
@Entity('admin')
export class Admin {
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
}