/*
 * @Date: 2021-03-17 19:15:52
 * @LastEditTime: 2021-03-17 19:18:44
 * @FilePath: \server\src\module\info\info.module.ts
 * @Description: TODO:
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jingdian } from 'entities/Jingdian.entity';
import { Route } from 'entities/Route.entity';
import { Site } from 'entities/Site.entity';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
    imports: [TypeOrmModule.forFeature([ Jingdian,Route,Site ])],
    providers: [InfoService],
    controllers: [InfoController]
})
export class InfoModule {}
