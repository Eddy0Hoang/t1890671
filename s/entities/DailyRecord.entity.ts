import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('daily_record')
export class DailyRecord {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    uid: number

    @Column()
    content: string
}
