/*
 * @Date: 2021-03-17 19:02:51
 * @LastEditTime: 2021-03-17 19:45:25
 * @FilePath: \server\entities\Jingdian.entity.ts
 * @Description: TODO:
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('jingdian')
export class Jingdian {
    @PrimaryGeneratedColumn() id?: number

    @Column()
    link: string
    @Column({ length: 1024 })
    specialty: string
    @Column({ length: 1024 })
    customs: string
    @Column({ length: 1024 })
    foods: string
    @Column({ length: 2048 })
    festivals: string
    @Column({ length: 1024 })
    famousScenery: string
    @Column({ length: 1024 })
    sceneryImages: string
    @Column({ length: 1024 })
    desc: string
    @Column({ length: 1024 })
    name: string
}