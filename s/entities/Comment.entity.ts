import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class Comment {

    @PrimaryGeneratedColumn() id: number

    /**
     * 评论的对象id
     */
    @Column() forId: number

    /**
     * 评论人id
     */
    @Column() fromId: number

    @Column() content: string

    @Column({ type: 'bigint' }) createTime: number
}
