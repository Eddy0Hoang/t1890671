import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

/*
 * @Date: 2021-03-17 19:06:05
 * @LastEditTime: 2021-03-17 19:44:48
 * @FilePath: \server\entities\Site.entity.ts
 * @Description: TODO:
 */
@Entity('site')
export class Site {
    @PrimaryGeneratedColumn() id?: number
    @Column() link: string
    @Column({ length: 1024 }) desc: string
    @Column({ length: 1024 }) sceneries: string
    @Column({ length: 1024 }) traffic: string
    @Column({ length: 1024 }) ticket: string
    @Column({ length: 1024 }) suggestions: string
    @Column() name: string
    @Column() img: string
}