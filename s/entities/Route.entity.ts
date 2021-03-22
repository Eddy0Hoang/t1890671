/*
 * @Date: 2021-03-17 19:08:10
 * @LastEditTime: 2021-03-17 19:49:31
 * @FilePath: \server\entities\Route.entity.ts
 * @Description: TODO:
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('route')
export class Route {
    @PrimaryGeneratedColumn() id?: number
    @Column() name: string
    @Column({ length: 1024 }) route: string
}